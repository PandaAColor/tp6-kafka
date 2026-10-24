import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KafkaProducerService } from './kafka-producer.service.js';
import { EventsGateway } from './events.gateway.js';
import { crearEnvelope, EventEnvelope } from '@tp6/event-contracts';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Activation') private activationModel: Model<any>,
    private readonly kafka: KafkaProducerService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getActivation(id: string) {
    const activation = await this.activationModel
      .findOne({ customerId: Number(id) })
      .exec();

    if (!activation) {
      return { status: 'not_found' };
    }

    return {
      id: activation._id,
      customerId: activation.customerId,
      plan: activation.plan,
      estado: activation.estado ?? 'pending',
      createdAt: activation.createdAt,
      historial: activation.historial ?? [],
    };
  }

  async PostDatos(payload: {
    customerId: number;
    plan: string;
    motivo_fallo?: string;
  }): Promise<{ status: string; id: string }> {

    // 1. Guardar en MongoDB
    const saved = await this.activationModel.create(payload);

    // correlationId identifica esta solicitud completa (mismo para toda la saga)
    const correlationId = `act-${String(saved._id)}`;

    // 2. Armar el sobre con el payload específico
    const evento = crearEnvelope(
      'ActivationRequested',
      correlationId,
      payload.customerId,
      {
        planId: payload.plan,
        channel: 'web',
        simulateFailure: payload.motivo_fallo ?? 'none',
      },
    );

    // 3. Guardar el evento en el historial de Mongo
    await this.registrarEvento(saved._id, evento);

    // 4. Emitir a la UI que llegó la solicitud
    this.eventsGateway.emitEvento('activation.requested', evento);

    // 5. Publicar el sobre completo en Kafka con clave = customerId
    await this.kafka.publish(
      'activation.requested',
      String(payload.customerId),
      evento,
    );

    // 6. Responder al frontend
    return { status: 'ok', id: String(saved._id) };
  }

  async completarSaga(resultado: {
    correlationId: string;
    customerId: number;
    billing: string;
    provisioning: string;
  }) {
    const { correlationId, customerId, billing, provisioning } = resultado;

    // Buscar la activación por customerId (convertido a número para matchear Mongo)
    const activation = await this.activationModel
      .findOne({ customerId: Number(customerId) })
      .exec();

    if (!activation) {
      console.log(`No se encontró activación para customerId ${customerId}`);
      return;
    }

    // Armar sobres de resultado de cada servicio
    const billingEvento = crearEnvelope(
      billing === 'ok' ? 'BillingCompleted' : 'BillingFailed',
      correlationId,
      customerId,
      { planId: activation.plan, reason: billing === 'ok' ? undefined : 'simulated' },
      'billing',
    );
    const provisioningEvento = crearEnvelope(
      provisioning === 'ok' ? 'ProvisioningCompleted' : 'ProvisioningFailed',
      correlationId,
      customerId,
      { planId: activation.plan, reason: provisioning === 'ok' ? undefined : 'simulated' },
      'provisioning',
    );

    // Guardar en historial y emitir a la UI
    await this.registrarEvento(activation._id, billingEvento);
    await this.registrarEvento(activation._id, provisioningEvento);
    this.eventsGateway.emitEvento('billing.events', billingEvento);
    this.eventsGateway.emitEvento('provisioning.events', provisioningEvento);

    // CAMBIO: OR en vez de AND — falla si falla CUALQUIERA de los dos
    if (billing != 'ok' || provisioning != 'ok') {
      console.log(`Saga del cliente ${customerId} FALLÓ:`, resultado);
      await this.activationModel.updateOne(
        { customerId: Number(customerId) },
        { estado: 'failed' },
      );

      const falloEvento = crearEnvelope(
        'ActivationFailed',
        correlationId,
        customerId,
        { billing, provisioning },
      );
      await this.registrarEvento(activation._id, falloEvento);
      this.eventsGateway.emitEvento('activation.failed', falloEvento);
      return;
    }

    console.log(`Saga del cliente ${customerId} COMPLETADA`);
    await this.activationModel.updateOne(
      { customerId: Number(customerId) },
      { estado: 'active' },
    );

    const completadoEvento = crearEnvelope(
      'ActivationCompleted',
      correlationId,
      customerId,
      { billing, provisioning },
    );
    await this.registrarEvento(activation._id, completadoEvento);
    this.eventsGateway.emitEvento('activation.completed', completadoEvento);

    await this.kafka.publish('activation.events', String(customerId), completadoEvento);
  }

  // Helper para guardar un evento en el historial de Mongo
  private async registrarEvento(id: string, evento: EventEnvelope) {
    await this.activationModel.updateOne(
      { _id: id },
      { $push: { historial: evento } },
    );
  }
}

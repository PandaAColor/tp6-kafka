// saga-consumer.service.ts (en activation-api)
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { desempaquetarEnvelope, EventTypes } from '@tp6/event-contracts';

@Injectable()
export class SagaConsumerService implements OnModuleInit, OnModuleDestroy {
  private consumer: Consumer;
  private estados = new Map<string, {
    billing?: string;
    provisioning?: string;
    customerId: number;
  }>();

  constructor(private readonly onEvento: (payload: any) => Promise<void>) {
    const kafka = new Kafka({
      clientId: 'activation-api-saga',
      brokers: ['kafka:9092'],
    });
    this.consumer = kafka.consumer({ groupId: 'activation-api-saga' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topics: ['billing.events', 'provisioning.events'],
      fromBeginning: true,
    });
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        // 1. Desempaquetar el sobre
        if(message.value == null) {return}
        const envelope = desempaquetarEnvelope(JSON.parse(message.value.toString()));
        if (!envelope) return;

        const { eventType, correlationId, customerId } = envelope;

        // 2. Acumular el resultado por correlationId
        if (!this.estados.has(correlationId)) {
          this.estados.set(correlationId, { customerId: Number(customerId) });
        }
        const estado = this.estados.get(correlationId)!;

        if (eventType === EventTypes.BILLING_COMPLETED) estado.billing = 'ok';
        if (eventType === EventTypes.BILLING_FAILED) estado.billing = 'error';
        if (eventType === EventTypes.PROVISIONING_COMPLETED) estado.provisioning = 'ok';
        if (eventType === EventTypes.PROVISIONING_FAILED) estado.provisioning = 'error';

        console.log(`Saga: estado del correlationId ${correlationId}:`, estado);

        // 3. Cuando ambos llegaron, evaluamos
        if (estado.billing && estado.provisioning) {
          await this.onEvento({
            correlationId,
            customerId: estado.customerId,
            billing: estado.billing,
            provisioning: estado.provisioning,
          });
          this.estados.delete(correlationId);
        }
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}

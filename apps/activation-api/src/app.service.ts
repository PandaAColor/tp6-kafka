import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KafkaProducerService } from './kafka-producer.service.js';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Activation') private activationModel: Model<any>,
    private readonly kafka: KafkaProducerService,
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  async PostDatos(payload: {
    customerId: number;
    plan: string;
    motivo_fallo?: string;
  }): Promise<{ status: string; id: string }> {
    // 1. Guardar en MongoDB
    const saved = await this.activationModel.create(payload);

    // 2. Publicar evento en Kafka con clave = customerId
    await this.kafka.publish(
      'activation.requested',
      String(payload.customerId),
      payload,
    );

    // 3. Responder al frontend
    return { status: 'ok', id: String(saved._id) };
  }

}

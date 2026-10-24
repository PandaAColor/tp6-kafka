// provisioning.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaConsumerService } from './kafka-consumer.service.js';
import { KafkaProducerService } from './kafka-producer.service.js';
import { crearEnvelope, EventTypes } from '@tp6/event-contracts';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly consumer: KafkaConsumerService,
    private readonly producer: KafkaProducerService,
  ) {}

  async onModuleInit() {
    await this.consumer.subscribeAndRun(['activation.requested'], async (envelope) => {
      const { eventType, correlationId, customerId, payload } = envelope;
      if (eventType !== EventTypes.ACTIVATION_REQUESTED) return;

      const { planId, simulateFailure } = payload;

      // Publicar el resultado con el MISMO correlationId
      const resultado = crearEnvelope(
        simulateFailure === 'provisioning'
          ? EventTypes.PROVISIONING_FAILED
          : EventTypes.PROVISIONING_COMPLETED,
        correlationId,
        customerId,
        { planId },
        'provisioning',
      );

      await this.producer.publish('provisioning.events', customerId, resultado);
    });
  }
}

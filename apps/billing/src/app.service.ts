// billing.service.ts
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

      const resultado = crearEnvelope(
        simulateFailure === 'billing'
          ? EventTypes.BILLING_FAILED
          : EventTypes.BILLING_COMPLETED,
        correlationId,
        customerId,
        { planId },
        'billing',
      );

      await this.producer.publish('billing.events', customerId, resultado);
    });
  }
}

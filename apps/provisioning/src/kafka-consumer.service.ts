// kafka-consumer.service.ts (en cada servicio)
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { desempaquetarEnvelope } from '@tp6/event-contracts';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private consumer: Consumer;

  // 'billing' | 'provisioning' | 'notification' | 'crm-analytics'
  constructor(private readonly groupId: string) {
    const kafka = new Kafka({
      clientId: this.groupId,
      brokers: ['kafka:9092'],
    });
    this.consumer = kafka.consumer({ groupId: this.groupId });
  }

  async onModuleInit() {
    await this.consumer.connect();
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }

  async subscribeAndRun(topics: string[], handler: (message: any) => Promise<void>) {
    await this.consumer.subscribe({ topics, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (message.value == null) return;
        const raw = JSON.parse(message.value.toString());

        // Desempaquetar el sobre antes de pasarlo al handler
        const envelope = desempaquetarEnvelope(raw);
        if (!envelope) return;

        console.log(`[${this.groupId}] recibió de ${topic}:`, envelope);
        await handler(envelope);
      },
    });
  }
}

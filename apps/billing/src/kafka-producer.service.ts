// kafka-producer.service.ts (en billing)
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'billing-producer',
      brokers: ['kafka:9092'],
    });
    this.producer = kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async publish(topic: string, key: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ key, value: JSON.stringify(message) }],
    });
    console.log(`[billing] publicó en ${topic}:`, message);
  }
}

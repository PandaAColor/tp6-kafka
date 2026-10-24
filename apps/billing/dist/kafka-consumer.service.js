var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { desempaquetarEnvelope } from '@tp6/event-contracts';
let KafkaConsumerService = class KafkaConsumerService {
    groupId;
    consumer;
    constructor(groupId) {
        this.groupId = groupId;
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
    async subscribeAndRun(topics, handler) {
        await this.consumer.subscribe({ topics, fromBeginning: true });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                if (message.value == null)
                    return;
                const raw = JSON.parse(message.value.toString());
                const envelope = desempaquetarEnvelope(raw);
                if (!envelope)
                    return;
                console.log(`[${this.groupId}] recibió de ${topic}:`, envelope);
                await handler(envelope);
            },
        });
    }
};
KafkaConsumerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [String])
], KafkaConsumerService);
export { KafkaConsumerService };
//# sourceMappingURL=kafka-consumer.service.js.map
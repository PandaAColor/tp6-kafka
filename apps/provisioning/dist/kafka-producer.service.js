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
let KafkaProducerService = class KafkaProducerService {
    producer;
    constructor() {
        const kafka = new Kafka({
            clientId: 'provisioning-producer',
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
    async publish(topic, key, message) {
        await this.producer.send({
            topic,
            messages: [{ key, value: JSON.stringify(message) }],
        });
        console.log(`[provisioning] publicó en ${topic}:`, message);
    }
};
KafkaProducerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], KafkaProducerService);
export { KafkaProducerService };
//# sourceMappingURL=kafka-producer.service.js.map
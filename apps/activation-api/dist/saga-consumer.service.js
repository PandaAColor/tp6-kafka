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
import { desempaquetarEnvelope, EventTypes } from '@tp6/event-contracts';
let SagaConsumerService = class SagaConsumerService {
    onEvento;
    consumer;
    estados = new Map();
    constructor(onEvento) {
        this.onEvento = onEvento;
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
                if (message.value == null) {
                    return;
                }
                const envelope = desempaquetarEnvelope(JSON.parse(message.value.toString()));
                if (!envelope)
                    return;
                const { eventType, correlationId, customerId } = envelope;
                if (!this.estados.has(correlationId)) {
                    this.estados.set(correlationId, { customerId: Number(customerId) });
                }
                const estado = this.estados.get(correlationId);
                if (eventType === EventTypes.BILLING_COMPLETED)
                    estado.billing = 'ok';
                if (eventType === EventTypes.BILLING_FAILED)
                    estado.billing = 'error';
                if (eventType === EventTypes.PROVISIONING_COMPLETED)
                    estado.provisioning = 'ok';
                if (eventType === EventTypes.PROVISIONING_FAILED)
                    estado.provisioning = 'error';
                console.log(`Saga: estado del correlationId ${correlationId}:`, estado);
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
};
SagaConsumerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Function])
], SagaConsumerService);
export { SagaConsumerService };
//# sourceMappingURL=saga-consumer.service.js.map
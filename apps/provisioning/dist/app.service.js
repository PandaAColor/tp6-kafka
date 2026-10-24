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
import { KafkaConsumerService } from './kafka-consumer.service.js';
import { KafkaProducerService } from './kafka-producer.service.js';
import { crearEnvelope, EventTypes } from '@tp6/event-contracts';
let AppService = class AppService {
    consumer;
    producer;
    constructor(consumer, producer) {
        this.consumer = consumer;
        this.producer = producer;
    }
    async onModuleInit() {
        await this.consumer.subscribeAndRun(['activation.requested'], async (envelope) => {
            const { eventType, correlationId, customerId, payload } = envelope;
            if (eventType !== EventTypes.ACTIVATION_REQUESTED)
                return;
            const { planId, simulateFailure } = payload;
            const resultado = crearEnvelope(simulateFailure === 'provisioning'
                ? EventTypes.PROVISIONING_FAILED
                : EventTypes.PROVISIONING_COMPLETED, correlationId, customerId, { planId }, 'provisioning');
            await this.producer.publish('provisioning.events', customerId, resultado);
        });
    }
};
AppService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [KafkaConsumerService,
        KafkaProducerService])
], AppService);
export { AppService };
//# sourceMappingURL=app.service.js.map
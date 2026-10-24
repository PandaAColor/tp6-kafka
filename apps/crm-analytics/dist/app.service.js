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
let AppService = class AppService {
    consumer;
    historial = [];
    constructor(consumer) {
        this.consumer = consumer;
    }
    getHello() {
        return 'Hello World!';
    }
    async onModuleInit() {
        await this.consumer.subscribeAndRun(['activation.requested', 'billing.events', 'provisioning.events', 'activation.events'], async (envelope) => {
            this.historial.push(envelope);
            console.log(`CRM-Analytics registró evento:`, envelope);
        });
    }
    getHistorial() {
        return this.historial;
    }
    reprocesarHistorial() {
        for (const evento of this.historial) {
            console.log(`CRM-Analytics reprocesó:`, evento.eventType, evento.correlationId);
        }
        return { reprocesados: this.historial.length };
    }
};
AppService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [KafkaConsumerService])
], AppService);
export { AppService };
//# sourceMappingURL=app.service.js.map
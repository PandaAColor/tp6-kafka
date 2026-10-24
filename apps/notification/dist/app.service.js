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
import nodemailer from 'nodemailer';
import { KafkaConsumerService } from './kafka-consumer.service.js';
import { EventTypes } from '@tp6/event-contracts';
let AppService = class AppService {
    consumer;
    transporter;
    constructor(consumer) {
        this.consumer = consumer;
        this.transporter = nodemailer.createTransport({
            host: 'mailhog',
            port: 1025,
            ignoreTLS: true
        });
    }
    getHello() {
        return 'Hello World!';
    }
    async onModuleInit() {
        await this.consumer.subscribeAndRun(['activation.events'], async (envelope) => {
            if (envelope.eventType !== EventTypes.ACTIVATION_COMPLETED)
                return;
            const { customerId, payload } = envelope;
            const { plan, email } = payload;
            const info = await this.transporter.sendMail({
                from: 'no-reply@kafka.com',
                to: email ?? `cliente${customerId}@example.com`,
                subject: '¡Plan activado!',
                text: `Hola, tu plan ${plan} fue activado correctamente.`,
                html: `<h1>¡Bienvenido!</h1><p>Tu plan <b>${plan}</b> fue activado.</p>`,
            });
            console.log(`Mail enviado a ${email}, id: ${info.messageId}`);
        });
    }
};
AppService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [KafkaConsumerService])
], AppService);
export { AppService };
//# sourceMappingURL=app.service.js.map
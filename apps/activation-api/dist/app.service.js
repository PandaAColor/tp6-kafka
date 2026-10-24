var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KafkaProducerService } from './kafka-producer.service.js';
import { EventsGateway } from './events.gateway.js';
import { crearEnvelope } from '@tp6/event-contracts';
let AppService = class AppService {
    activationModel;
    kafka;
    eventsGateway;
    constructor(activationModel, kafka, eventsGateway) {
        this.activationModel = activationModel;
        this.kafka = kafka;
        this.eventsGateway = eventsGateway;
    }
    getHello() {
        return 'Hello World!';
    }
    async getActivation(id) {
        const activation = await this.activationModel.findById(id).exec();
        if (!activation) {
            return { status: 'not_found' };
        }
        return {
            id: activation._id,
            customerId: activation.customerId,
            plan: activation.plan,
            estado: activation.estado ?? 'pending',
            createdAt: activation.createdAt,
            historial: activation.historial ?? [],
        };
    }
    async PostDatos(payload) {
        const saved = await this.activationModel.create(payload);
        const correlationId = `act-${String(saved._id)}`;
        const evento = crearEnvelope('ActivationRequested', correlationId, payload.customerId, {
            planId: payload.plan,
            channel: 'web',
            simulateFailure: payload.motivo_fallo ?? 'none',
        });
        await this.registrarEvento(saved._id, evento);
        this.eventsGateway.emitEvento('activation.requested', evento);
        await this.kafka.publish('activation.requested', String(payload.customerId), evento);
        return { status: 'ok', id: String(saved._id) };
    }
    async completarSaga(resultado) {
        const { correlationId, customerId, billing, provisioning } = resultado;
        const activation = await this.activationModel.findOne({ customerId }).exec();
        if (!activation) {
            console.log(`No se encontró activación para customerId ${customerId}`);
            return;
        }
        const billingEvento = crearEnvelope(billing === 'ok' ? 'BillingCompleted' : 'BillingFailed', correlationId, customerId, { planId: activation.plan, reason: billing === 'ok' ? undefined : 'simulated' }, 'billing');
        const provisioningEvento = crearEnvelope(provisioning === 'ok' ? 'ProvisioningCompleted' : 'ProvisioningFailed', correlationId, customerId, { planId: activation.plan, reason: provisioning === 'ok' ? undefined : 'simulated' }, 'provisioning');
        await this.registrarEvento(activation._id, billingEvento);
        await this.registrarEvento(activation._id, provisioningEvento);
        this.eventsGateway.emitEvento('billing.events', billingEvento);
        this.eventsGateway.emitEvento('provisioning.events', provisioningEvento);
        if (billing != 'ok' && provisioning != 'ok') {
            console.log(`Saga del cliente ${customerId} FALLÓ:`, resultado);
            await this.activationModel.updateOne({ customerId }, { estado: 'failed' });
            const falloEvento = crearEnvelope('ActivationFailed', correlationId, customerId, { billing, provisioning });
            await this.registrarEvento(activation._id, falloEvento);
            this.eventsGateway.emitEvento('activation.failed', falloEvento);
            return;
        }
        console.log(`Saga del cliente ${customerId} COMPLETADA`);
        await this.activationModel.updateOne({ customerId }, { estado: 'active' });
        const completadoEvento = crearEnvelope('ActivationCompleted', correlationId, customerId, { billing, provisioning });
        await this.registrarEvento(activation._id, completadoEvento);
        this.eventsGateway.emitEvento('activation.completed', completadoEvento);
        await this.kafka.publish('activation.events', String(customerId), completadoEvento);
    }
    async registrarEvento(id, evento) {
        await this.activationModel.updateOne({ _id: id }, { $push: { historial: evento } });
    }
};
AppService = __decorate([
    Injectable(),
    __param(0, InjectModel('Activation')),
    __metadata("design:paramtypes", [Model,
        KafkaProducerService,
        EventsGateway])
], AppService);
export { AppService };
//# sourceMappingURL=app.service.js.map
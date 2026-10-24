"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypes = void 0;
exports.crearEnvelope = crearEnvelope;
exports.desempaquetarEnvelope = desempaquetarEnvelope;
// event-envelope.ts
const crypto_1 = require("crypto");
// Nombres de eventos de la saga (evita typos)
exports.EventTypes = {
    ACTIVATION_REQUESTED: 'ActivationRequested',
    BILLING_COMPLETED: 'BillingCompleted',
    BILLING_FAILED: 'BillingFailed',
    PROVISIONING_COMPLETED: 'ProvisioningCompleted',
    PROVISIONING_FAILED: 'ProvisioningFailed',
    ACTIVATION_COMPLETED: 'ActivationCompleted',
    ACTIVATION_FAILED: 'ActivationFailed',
};
function crearEnvelope(eventType, correlationId, customerId, payload, source = 'activation-api') {
    return {
        eventId: (0, crypto_1.randomUUID)(),
        eventType,
        version: 1,
        occurredAt: new Date().toISOString(),
        correlationId,
        customerId: String(customerId),
        source,
        payload,
    };
}
// Helper para desempaquetar y validar un mensaje recibido de Kafka
function desempaquetarEnvelope(msg) {
    if (!msg ||
        typeof msg !== 'object' ||
        typeof msg.eventId !== 'string' ||
        typeof msg.eventType !== 'string' ||
        typeof msg.correlationId !== 'string' ||
        typeof msg.customerId !== 'string' ||
        !('payload' in msg)) {
        console.warn('Mensaje recibido no es un envelope válido:', msg);
        return null;
    }
    return msg;
}

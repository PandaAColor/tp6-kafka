// event-envelope.ts
import { randomUUID } from 'crypto';

// Nombres de eventos de la saga (evita typos)
export const EventTypes = {
  ACTIVATION_REQUESTED: 'ActivationRequested',
  BILLING_COMPLETED: 'BillingCompleted',
  BILLING_FAILED: 'BillingFailed',
  PROVISIONING_COMPLETED: 'ProvisioningCompleted',
  PROVISIONING_FAILED: 'ProvisioningFailed',
  ACTIVATION_COMPLETED: 'ActivationCompleted',
  ACTIVATION_FAILED: 'ActivationFailed',
} as const;

export type EventType = (typeof EventTypes)[keyof typeof EventTypes];

export interface EventEnvelope<T = any> {
  eventId: string;
  eventType: string;
  version: number;
  occurredAt: string;
  correlationId: string;
  customerId: string;
  source: string;
  payload: T;
}

export function crearEnvelope<T>(
  eventType: string,
  correlationId: string,
  customerId: string | number,
  payload: T,
  source = 'activation-api',
): EventEnvelope<T> {
  return {
    eventId: randomUUID(),
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
export function desempaquetarEnvelope(msg: any): EventEnvelope | null {
  if (
    !msg ||
    typeof msg !== 'object' ||
    typeof msg.eventId !== 'string' ||
    typeof msg.eventType !== 'string' ||
    typeof msg.correlationId !== 'string' ||
    typeof msg.customerId !== 'string' ||
    !('payload' in msg)
  ) {
    console.warn('Mensaje recibido no es un envelope válido:', msg);
    return null;
  }
  return msg as EventEnvelope;
}

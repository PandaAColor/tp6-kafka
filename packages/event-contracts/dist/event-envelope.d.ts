export declare const EventTypes: {
    readonly ACTIVATION_REQUESTED: "ActivationRequested";
    readonly BILLING_COMPLETED: "BillingCompleted";
    readonly BILLING_FAILED: "BillingFailed";
    readonly PROVISIONING_COMPLETED: "ProvisioningCompleted";
    readonly PROVISIONING_FAILED: "ProvisioningFailed";
    readonly ACTIVATION_COMPLETED: "ActivationCompleted";
    readonly ACTIVATION_FAILED: "ActivationFailed";
};
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
export declare function crearEnvelope<T>(eventType: string, correlationId: string, customerId: string | number, payload: T, source?: string): EventEnvelope<T>;
export declare function desempaquetarEnvelope(msg: any): EventEnvelope | null;

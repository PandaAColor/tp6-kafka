import { Model } from 'mongoose';
import { KafkaProducerService } from './kafka-producer.service.js';
import { EventsGateway } from './events.gateway.js';
export declare class AppService {
    private activationModel;
    private readonly kafka;
    private readonly eventsGateway;
    constructor(activationModel: Model<any>, kafka: KafkaProducerService, eventsGateway: EventsGateway);
    getHello(): string;
    getActivation(id: string): Promise<{
        status: string;
        id?: undefined;
        customerId?: undefined;
        plan?: undefined;
        estado?: undefined;
        createdAt?: undefined;
        historial?: undefined;
    } | {
        id: any;
        customerId: any;
        plan: any;
        estado: any;
        createdAt: any;
        historial: any;
        status?: undefined;
    }>;
    PostDatos(payload: {
        customerId: number;
        plan: string;
        motivo_fallo?: string;
    }): Promise<{
        status: string;
        id: string;
    }>;
    completarSaga(resultado: {
        correlationId: string;
        customerId: number;
        billing: string;
        provisioning: string;
    }): Promise<void>;
    private registrarEvento;
}

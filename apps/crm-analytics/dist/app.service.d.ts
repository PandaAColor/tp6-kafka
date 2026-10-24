import { OnModuleInit } from '@nestjs/common';
import { KafkaConsumerService } from './kafka-consumer.service.js';
import { EventEnvelope } from '@tp6/event-contracts';
export declare class AppService implements OnModuleInit {
    private readonly consumer;
    private historial;
    constructor(consumer: KafkaConsumerService);
    getHello(): string;
    onModuleInit(): Promise<void>;
    getHistorial(): EventEnvelope[];
    reprocesarHistorial(): {
        reprocesados: number;
    };
}

import { OnModuleInit } from '@nestjs/common';
import { KafkaConsumerService } from './kafka-consumer.service.js';
export declare class AppService implements OnModuleInit {
    private readonly consumer;
    private transporter;
    constructor(consumer: KafkaConsumerService);
    getHello(): string;
    onModuleInit(): Promise<void>;
}

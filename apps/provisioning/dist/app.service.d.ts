import { OnModuleInit } from '@nestjs/common';
import { KafkaConsumerService } from './kafka-consumer.service.js';
import { KafkaProducerService } from './kafka-producer.service.js';
export declare class AppService implements OnModuleInit {
    private readonly consumer;
    private readonly producer;
    constructor(consumer: KafkaConsumerService, producer: KafkaProducerService);
    onModuleInit(): Promise<void>;
}

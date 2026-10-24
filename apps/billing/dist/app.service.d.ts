import { KafkaConsumerService } from './kafka-consumer.service.js';
import { KafkaProducerService } from './kafka-producer.service.js';
export declare class AppService {
    private readonly consumer;
    private readonly producer;
    constructor(consumer: KafkaConsumerService, producer: KafkaProducerService);
    iniciar(): Promise<void>;
}

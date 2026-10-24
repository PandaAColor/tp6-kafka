import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
    private producer;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    publish(topic: string, key: string, message: any): Promise<void>;
}

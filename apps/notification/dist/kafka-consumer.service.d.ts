import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
    private readonly groupId;
    private consumer;
    constructor(groupId: string);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    subscribeAndRun(topics: string[], handler: (message: any) => Promise<void>): Promise<void>;
}

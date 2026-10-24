import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare class SagaConsumerService implements OnModuleInit, OnModuleDestroy {
    private readonly onEvento;
    private consumer;
    private estados;
    constructor(onEvento: (payload: any) => Promise<void>);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}

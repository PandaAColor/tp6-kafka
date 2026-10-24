var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { KafkaProducerService } from './kafka-producer.service.js';
import { ActivationSchema } from './activation.schema.js';
import { SagaConsumerService } from './saga-consumer.service.js';
import { EventsGateway } from './events.gateway.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            MongooseModule.forRoot('mongodb://mongo:27017/tp6-kafka'),
            MongooseModule.forFeature([{ name: 'Activation', schema: ActivationSchema }]),
        ],
        controllers: [AppController],
        providers: [
            AppService,
            KafkaProducerService,
            EventsGateway,
            {
                provide: SagaConsumerService,
                useFactory: (appService) => new SagaConsumerService((r) => appService.completarSaga(r)),
                inject: [AppService],
            },
        ],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map
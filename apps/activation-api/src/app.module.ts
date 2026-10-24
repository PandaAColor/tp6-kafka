// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { KafkaProducerService } from './kafka-producer.service.js';
import { ActivationSchema } from './activation.schema.js';
import { SagaConsumerService } from './saga-consumer.service.js';
import { EventsGateway } from './events.gateway.js';

@Module({
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
      useFactory: (appService: AppService) =>
        new SagaConsumerService((r) => appService.completarSaga(r)),
      inject: [AppService],
    },
  ],
})
export class AppModule {}

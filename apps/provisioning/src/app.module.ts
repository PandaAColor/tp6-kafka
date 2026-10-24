import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { KafkaConsumerService } from './kafka-consumer.service.js';
import { KafkaProducerService } from './kafka-producer.service.js';

@Module({
  imports: [],
  controllers: [AppController],
   providers: [
    AppService,
    { provide: KafkaConsumerService, useValue: new KafkaConsumerService('provisioning') },
    KafkaProducerService,
  ],
})
export class AppModule {}

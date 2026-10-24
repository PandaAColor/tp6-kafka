import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { KafkaConsumerService } from './kafka-consumer.service.js';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: KafkaConsumerService, useValue: new KafkaConsumerService('notification') },
  ],
})
export class AppModule {}

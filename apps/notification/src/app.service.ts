import { Injectable, OnModuleInit } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { KafkaConsumerService } from './kafka-consumer.service.js';
import { EventTypes } from '@tp6/event-contracts';

@Injectable()
export class AppService implements OnModuleInit {
  private transporter;
  constructor(private readonly consumer: KafkaConsumerService){
    this.transporter = nodemailer.createTransport({
      host: 'mailhog',
      port: 1025,
      ignoreTLS: true
    })
  }

  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit() {
    await this.consumer.subscribeAndRun(['activation.events'], async (envelope) => {
      // 1. Solo procesar la activación completada
      if (envelope.eventType !== EventTypes.ACTIVATION_COMPLETED) return;

      // 2. Leer los datos del sobre
      const { customerId, payload } = envelope;
      const { plan, email } = payload;

      const info = await this.transporter.sendMail({
        from: 'no-reply@kafka.com',
        to: email ?? `cliente${customerId}@example.com`,
        subject: '¡Plan activado!',
        text: `Hola, tu plan ${plan} fue activado correctamente.`,
        html: `<h1>¡Bienvenido!</h1><p>Tu plan <b>${plan}</b> fue activado.</p>`,
      });
      console.log(`Mail enviado a ${email}, id: ${info.messageId}`)
    })
  }
}

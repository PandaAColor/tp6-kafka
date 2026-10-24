// app.service.ts (crm-analytics)
import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaConsumerService } from './kafka-consumer.service.js';
import { desempaquetarEnvelope, EventEnvelope } from '@tp6/event-contracts';

@Injectable()
export class AppService implements OnModuleInit {
  // Acumula todos los eventos recibidos (en memoria)
  private historial: EventEnvelope[] = [];

  constructor(private readonly consumer: KafkaConsumerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit() {
    await this.consumer.subscribeAndRun(
      ['activation.requested', 'billing.events', 'provisioning.events', 'activation.events'],
      async (envelope) => {
        // Guardar el evento en el historial
        this.historial.push(envelope);
        console.log(`CRM-Analytics registró evento:`, envelope);
      },
    );
  }

  // Devuelve todos los eventos registrados
  getHistorial(): EventEnvelope[] {
    return this.historial;
  }

  // Reprocesa el historial desde el inicio (por ejemplo, re-emite cada evento)
  reprocesarHistorial(): { reprocesados: number } {
    for (const evento of this.historial) {
      console.log(`CRM-Analytics reprocesó:`, evento.eventType, evento.correlationId);
      // Acá iría la lógica de análisis/reproceso de cada evento
    }
    return { reprocesados: this.historial.length };
  }
}

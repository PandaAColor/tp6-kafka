// events.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: 'http://localhost:5173' }, // origen del frontend (Vite)
})
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  // Método público para emitir eventos a todos los clientes
  emitEvento(evento: string, payload: any) {
    this.server.emit(evento, payload);
  }
}

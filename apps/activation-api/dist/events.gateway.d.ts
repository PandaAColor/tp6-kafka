import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class EventsGateway implements OnGatewayConnection {
    server: Server;
    handleConnection(client: Socket): void;
    emitEvento(evento: string, payload: any): void;
}

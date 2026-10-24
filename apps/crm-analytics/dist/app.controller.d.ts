import { AppService } from './app.service.js';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHistorial(): import("@tp6/event-contracts").EventEnvelope<any>[];
    reprocesar(): {
        reprocesados: number;
    };
}

import { AppService } from './app.service.js';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    PostDatos(body: {
        customerId: number;
        plan: string;
        motivo_fallo?: string;
    }): Promise<{
        status: string;
        id: string;
    }>;
}

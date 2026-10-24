// app.controller.ts (crm-analytics)
import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('analytics/historial')
  getHistorial() {
    return this.appService.getHistorial();
  }

  @Post('analytics/reprocesar')
  reprocesar() {
    return this.appService.reprocesarHistorial();
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/activation')
  PostDatos(@Body() body: { customerId: number; plan: string; motivo_fallo?: string }) {
    return this.appService.PostDatos(body);
  }
}

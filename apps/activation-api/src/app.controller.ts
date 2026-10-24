import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post('/activation')
  PostDatos(@Body() body: { customerId: number; plan: string; motivo_fallo?: string }) {
    return this.appService.PostDatos(body);
  }

  @Get('/activations/:id')
  async getActivation(@Param('id') id: string) {
    return this.appService.getActivation(id);
  }

}

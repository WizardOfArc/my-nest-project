import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('double/:input')
  getDouble(@Param() params): number {
    return this.appService.getDouble(params.input);
  }

  @Get('fannify/:num')
  getFannify(@Param() params): number {
    return this.appService.getFannify(params.num);
  }

  @Get('dubbafan/:nummy')
  getDubbaFan(@Param() params): number {
    return this.appService.getDouble(this.appService.getFannify(params.nummy));
  }


}

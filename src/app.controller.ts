import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('double/:input')
  getDouble(@Param( 'input', ParseIntPipe) input: number): number {
    return this.appService.getDouble(input);
  }

  @Get('fannify/:num')
  getFannify(@Param('num', ParseIntPipe) num: number): number {
    return this.appService.getFannify(num);
  }

  @Get('dubbafan/:nummy')
  getDubbaFan(@Param('nummy', ParseIntPipe) nummy: number): number {
    return this.appService.getDouble(this.appService.getFannify(nummy));
  }

  @Get('parens/:input')
  getParens(@Param( 'input', ParseIntPipe) input: number): string[] {
    return this.appService.getParens(input);
  }

  @Get('parensbfs/:input')
  getParensBFS(@Param( 'input', ParseIntPipe) input: number): string[] {
    return this.appService.getParensBFS(input);
  }

  @Get('parensint/:input')
  getParensInt(@Param( 'input', ParseIntPipe) input: number): string[] {
    return this.appService.getParensInt(input);
  }

  @Get('parensrepack/:input')
  getParensRepack(@Param( 'input', ParseIntPipe) input: number): string[] {
    return this.appService.getParansEmptyAgusRepack(input);
  }

  @Get('primecount/:num')
  getPrimeCount(@Param('num', ParseIntPipe) num: number): number {
    return this.appService.getPrimeCount(num);
  }

  @Get('fake/:rest')
  getFakeProxy(@Param('rest') rest: string) {
    return this.appService.getFakeProxy(rest);
  }
}

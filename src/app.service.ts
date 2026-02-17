import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  fan = 5.6;

  getDouble(num: number): number { 
    return 2*num;
  }


  getFannify(num: number): number {
    return this.fan * num;
  }


}

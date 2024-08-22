import { Controller, Get } from '@nestjs/common';
import { MainService } from './main.service';
import { AppResponse } from '../../shared/responses/app-response';

@Controller()
export class MainController {
  constructor(private readonly appService: MainService) {}

  @Get()
  getHello(): AppResponse<any> {
    // throw new ServiceError('Service error');
    return this.appService.getHello();
  }
}

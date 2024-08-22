import { Injectable } from '@nestjs/common';
import { AppResponse } from '../../shared/responses/app-response';

@Injectable()
export class MainService {
  getHello(): AppResponse<any> {
    return AppResponse.Ok({ message: 'Hello World!' });
  }
}

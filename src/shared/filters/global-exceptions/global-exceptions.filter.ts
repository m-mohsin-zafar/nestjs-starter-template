import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseError } from '../../errors/base-error';
import { AppResponse } from '../../responses/app-response';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof BaseError
        ? exception.statusCode
        : exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof BaseError
        ? exception.message
        : exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal server error';

    let responseBody: AppResponse<any>;
    if (typeof message === 'string') {
      responseBody = AppResponse.Err({ text: message });
    } else {
      // replace 'message' with 'value' in the response object to avoid accessing message.message
      if (message['message']) {
        message['text'] = message['message'];
        delete message['message'];
      }
      responseBody = AppResponse.Err({ ...message, path: request.url });
    }
    response.status(status).json(responseBody);
  }
}

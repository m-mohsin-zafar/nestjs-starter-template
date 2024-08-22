import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';
import { AppResponse } from '../../responses/app-response';
import { PaginatedResponse } from '../../responses/paginated-response';
import { DataLayerResponse } from '../../responses/data-layer-response';

@Injectable()
export class AppResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map(data => {
        if (data instanceof PaginatedResponse) {
          return data;
        }
        if (data instanceof AppResponse) {
          return data;
        }
        if (Array.isArray(data) && data.length === 0) {
          return DataLayerResponse.Empty();
        }
        if (!data) {
          return AppResponse.Err('No data found');
        }
        return AppResponse.Ok(data);
      }),
    );
  }
}

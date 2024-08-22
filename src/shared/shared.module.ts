import { Module } from '@nestjs/common';
import { EnvService } from './services/env/env.service';
import { ConfigModule } from '@nestjs/config';
import { GlobalExceptionsFilter } from './filters/global-exceptions/global-exceptions.filter';
import { AppResponseInterceptor } from './interceptors/app-response/app-response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`./env/.env.${process.env.NODE_ENV}`],
    }),
  ],
  providers: [EnvService, GlobalExceptionsFilter, AppResponseInterceptor],
  exports: [EnvService, GlobalExceptionsFilter, AppResponseInterceptor],
})
export class SharedModule {}

import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { HttpLoggerMiddleware } from './shared/middlewares/http-logger/http-logger.middleware';
import { HealthModule } from './modules/health/health.module';
import { HttpModule } from '@nestjs/axios';
import { MainModule } from './modules/main/main.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    SharedModule,
    HttpModule,
    MainModule,
    HealthModule,
  ],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}

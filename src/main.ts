import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './shared/services/env/env.service';
import helmet from 'helmet';
import { createLogger } from 'winston';
import { WinstonModule } from 'nest-winston';
import { loggerTransportConfig } from './shared/utilities/logger.config';
import * as compression from 'compression';
import { GlobalExceptionsFilter } from './shared/filters/global-exceptions/global-exceptions.filter';
import { AppResponseInterceptor } from './shared/interceptors/app-response/app-response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const logger = createLogger({
    transports: loggerTransportConfig(process.env.NODE_ENV),
  });

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: WinstonModule.createLogger(logger),
  });

  const envService = app.get(EnvService);
  const env = envService.nodeEnv;
  const port = envService.port;

  // CORS Configuration
  const corsOrigins = {
    development: '*',
    production: ['https://techbazaar.pk', 'https://www.techbazaar.pk'],
    uat: 'https://uat.techbazaar.pk',
    staging: 'https://staging.techbazaar.pk',
  };
  // Add cors based on the environment
  app.enableCors({
    origin: corsOrigins[env],
  });

  // Register Global Exception Filter
  app.useGlobalFilters(new GlobalExceptionsFilter());

  // Register Global Response Filter
  app.useGlobalInterceptors(new AppResponseInterceptor());

  // Register Public Assets Folder
  // app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public' });

  // Set Global Prefix
  app.setGlobalPrefix('api', {
    exclude: ['swagger', 'swagger-json', 'health', 'public'],
  });

  // Register Middlewares
  app.use(helmet());
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());
  app.use(helmet.hidePoweredBy());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    }),
  );
  app.use(compression());
  app.use(
    ['/swagger', '/swagger-json'],
    basicAuth({
      challenge: true,
      users: {
        [envService.swaggerUser]: envService.swaggerPassword,
      },
    }),
  );

  // Configure Swagger
  const options = new DocumentBuilder()
    .setTitle(envService.swaggerDocumentTitle)
    .setDescription(envService.swaggerDocumentDescription)
    .setVersion(envService.swaggerDocumentVersion)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'API Docs',
    jsonDocumentUrl: '/swagger-json',
  });

  await app.listen(port, () => {
    logger.info(`Server is running in ${env} environment on port::${port}`, { context: 'Bootstrap' });
  });
}
bootstrap();

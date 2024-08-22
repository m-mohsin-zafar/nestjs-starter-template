import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from '../../interfaces/env/env.interface';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService<Env, true>) {}

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  get port(): number {
    return this.configService.get<number>('PORT');
  }

  get databaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  get databasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  get databaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  get databaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  get databasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  get databaseDialect(): string {
    return this.configService.get<string>('DATABASE_DIALECT');
  }

  get bcryptSalt(): string {
    return this.configService.get<string>('BCRYPT_SALT');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  get jwtExpireIn(): string {
    return this.configService.get<string>('JWT_EXPIRATION');
  }

  get baseUrl(): string {
    return this.configService.get<string>('BASE_URL');
  }

  get sendGridApiKey(): string {
    return this.configService.get<string>('SENDGRID_API_KEY');
  }

  get sendGridFrom(): string {
    return this.configService.get<string>('SENDGRID_FROM_EMAIL');
  }

  get marketplaceDashboardUrl(): string {
    return this.configService.get<string>('MARKETPLACE_DASHBOARD_URL');
  }

  get googleUserInfoUrl(): string {
    return this.configService.get<string>('GOOGLE_USER_INFO_URL');
  }

  get enableLogging(): string {
    return this.configService.get<string>('ENABLE_LOGGING');
  }

  get refreshTokenExpiryTime(): string {
    return this.configService.get<string>('REFRESH_TOKEN_EXPIRY_TIME');
  }

  get recaptchaSecretKey(): string {
    return this.configService.get<string>('RECAPTCHA_SECRET_KEY');
  }

  get swaggerDocumentTitle(): string {
    return this.configService.get<string>('SWAGGER_TITLE');
  }

  get swaggerDocumentDescription(): string {
    return this.configService.get<string>('SWAGGER_DESCRIPTION');
  }

  get swaggerDocumentVersion(): string {
    return this.configService.get<string>('SWAGGER_VERSION');
  }

  get swaggerUser(): string {
    return this.configService.get<string>('SWAGGER_USER');
  }

  get swaggerPassword(): string {
    return this.configService.get<string>('SWAGGER_PASSWORD');
  }

  get redisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }

  get redisPort(): number {
    return this.configService.get<number>('REDIS_PORT');
  }

  get redisUser(): string {
    return this.configService.get<string>('REDIS_USER');
  }

  get redisPassword(): string {
    return this.configService.get<string>('REDIS_PASSWORD');
  }

  get sellerUrl(): string {
    return this.configService.get<string>('SELLER_URL');
  }
}

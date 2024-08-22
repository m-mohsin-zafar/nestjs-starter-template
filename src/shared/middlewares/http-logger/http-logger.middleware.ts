import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { EnvService } from '../../services/env/env.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly isDev: boolean;
  constructor(
    private readonly logger: Logger,
    private readonly envService: EnvService,
  ) {
    this.isDev = this.envService.nodeEnv === 'development' || this.envService.nodeEnv === 'staging';
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, headers } = req;
    const query = req.query;
    const body = req.body;
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;

      let logOptions = {
        message: `${method} ${originalUrl} - ${res.statusCode} ${duration}ms`,
        context: 'HTTP',
      };

      if (this.isDev && res.statusCode >= 400) {
        logOptions['headers'] = headers;
        logOptions['query'] = query;
        logOptions['body'] = JSON.stringify(body, null, 2);
      }

      if (res.statusCode >= 400 && res.statusCode < 500) {
        this.logger.error(logOptions);
      } else if (res.statusCode >= 500) {
        this.logger.fatal(logOptions);
      } else {
        this.logger.log(logOptions);
      }
    });
    next();
  }
}

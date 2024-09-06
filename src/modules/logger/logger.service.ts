import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

import { EnvConfigType, SentryConfigType } from '../../configs/envConfigType';

//Initialisation of cloud error handler
@Injectable()
export class LoggerService {
  private readonly isLocal: boolean;
  private readonly logger = new Logger();

  constructor(private readonly configService: ConfigService<EnvConfigType>) {
    const { dsn, debug, env } =
      this.configService.get<SentryConfigType>('sentry');
    this.isLocal = env === 'local';
    Sentry.init({
      dsn,
      debug,
      integrations: [
        nodeProfilingIntegration(),
        Sentry.anrIntegration({
          captureStackTrace: true,
          /* sending notice if event-loop blocked more than 5 sec*/
        }),
      ],
      // Tracing
      tracesSampleRate: 1.0, //  Capture 100% of the transactions

      // Set sampling rate for profiling - this is relative to tracesSampleRate
      profilesSampleRate: 1.0,
    });
  }

  public log(message: string): void {
    if (this.isLocal) {
      this.logger.log(message);
    } else {
      Sentry.captureMessage(message, 'log');
    }
  }

  public info(message: string): void {
    if (this.isLocal) {
      this.logger.log(message);
    } else {
      Sentry.captureMessage(message, 'info');
    }
  }

  public warn(message: string): void {
    if (this.isLocal) {
      this.logger.warn(message);
    } else {
      Sentry.captureMessage(message, 'warning');
    }
  }

  public error(error: any): void {
    if (this.isLocal) {
      this.logger.log(error);
    } else {
      Sentry.captureMessage(error, 'error');
    }
  }
}

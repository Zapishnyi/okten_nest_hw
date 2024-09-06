import { Global, Module } from '@nestjs/common';

import { LoggerService } from './logger.service';

@Global() /* to use this module globally*/
@Module({
  imports: [],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}

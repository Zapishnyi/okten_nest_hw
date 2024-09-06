// custom filter in a NestJS application that catches HTTP exceptions
// and formats the error response in a consistent way.
// It provides the client with the status code, the timestamp of the error,
// and the URL that caused the error.

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { LoggerService } from '../../modules/logger/logger.service';

// Decorator telling to Nest where to send all errors/exemptions
@Catch(/*HttpException*/) /*If no argument all errors will be intercepted and handled*/

// Class handling exemptions
/*This enforces that the class provides an implementation
for the catch method, which is part of the ExceptionFilter interface.*/
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  // catch method is triggered whenever an exception is thrown in the application.
  catch(
    exception: HttpException /* This is the exception that was thrown.
    It's of type HttpException, which is a built-in class in NestJS for handling HTTP errors.*/,
    host: ArgumentsHost /*This gives access to the context of the execution
    (e.g., HTTP request/response, WebSocket, etc.).
    Here, it is used to extract the HTTP request and response objects.*/,
  ) {
    const ctx = host.switchToHttp();
    /*converts the ArgumentsHost into an HTTP context,
       as the exception occurred during an HTTP request.*/

    const response = ctx.getResponse<Response>();
    /*extracts the response object from the
     HTTP context, allowing you to manipulate the HTTP response.*/

    const request = ctx.getRequest<Request>();
    /* extracts the request object from the
     HTTP context, allowing access to details about the HTTP request (e.g., the URL).*/
    let status: number;
    let messages: string[] | string;
    switch (true) {
      // validation
      case exception instanceof BadRequestException:
        status = exception.getStatus();
        /*retrieves the HTTP status code from the HttpException.
      The status code could be something like 404 for Not Found, 500 for Internal Server Error, etc.*/
        messages = (
          exception.getResponse() as {
            message: string[] | string;
          }
        ).message;
        break;
      //   HTTP request error
      case exception instanceof HttpException:
        status = exception.getStatus();
        messages = exception.message;
        break;
      //   postgres database error
      case exception instanceof QueryFailedError:
        status = HttpStatus.CONFLICT;
        const err = exception as QueryFailedError<any>;
        const m = err.driverError.detail;
        messages = [
          err.message,
          `${m.match(/(?<=\()[a-z]*(?=\))/)} ${m.match(/(?<=\=\().*(?=\) )/)} ${m.match(/(?<=\) ).*(?=.)/)}`,
        ];
        if (!messages.length) {
          messages = (exception as QueryFailedError).message;
        }
        break;
      case exception instanceof TokenExpiredError:
        status = HttpStatus.UNAUTHORIZED;
        messages = (exception as TokenExpiredError).message;
        break;
      case exception instanceof JsonWebTokenError:
        status = HttpStatus.UNAUTHORIZED;
        messages = (exception as JsonWebTokenError).message;
        break;
      case exception instanceof Error:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        messages = (exception as QueryFailedError).message;
        break;
      // all other errors
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        messages = 'Internal server error';
    }
    // console.log(exception);
    // Send the exception to Sentry
    // this.logger.error(exception);

    response.status(status).json({
      statusCode: status /*The status code of the error.*/,
      messages,
      timestamp: new Date().toISOString(),
      /*The current time in ISO 8601 format, indicating when the error occurred.*/
      path: request.url /*The URL of the request that caused the error*/,
    });
  }
}

import { BackendAuthModule } from '@mono/backend-auth';
import { BackendGithubModule } from '@mono/backend-github';
import { BackendGrpcModule } from '@mono/backend-grpc';
import { API_ENV } from '@mono/backend-interfaces';
import { BackendLoggerMiddleware } from '@mono/backend-logger';
import { BackendMailerModule } from '@mono/backend-mailer';
import { BackendWebsocketModule } from '@mono/backend-websocket';
import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { environment } from '../environments/environment';

/**
 * Root API application module.
 */
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 10000,
        maxRedirects: 5,
      }),
    }),
    BackendAuthModule.forRoot(),
    BackendMailerModule.forRoot(),
    BackendWebsocketModule.forRoot(),
    BackendGithubModule.forRoot(),
    BackendGrpcModule,
  ],
  providers: [
    {
      provide: API_ENV,
      useValue: environment,
    },
  ],
})
export class ApiAppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(BackendLoggerMiddleware).forRoutes('*');
  }
}

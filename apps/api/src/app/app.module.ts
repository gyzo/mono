import { API_ENV } from '@mono/api-interface';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { environment } from '../environments/environment';
import { ApiLoggerMiddleware } from './middleware/logger/logger.middleware';
import { ApiAuthModule } from './modules/auth/auth.module';
import { ApiGrpcModule } from './modules/grpc/grpc.module';
import { ApiMailerModule } from './modules/mailer/mailer.module';
import { ApiWebsocketModule } from './modules/websocket/websocket.module';

/**
 * Root API application module.
 */
@Module({
  imports: [
    ApiAuthModule.forRoot(),
    ApiMailerModule.forRoot(),
    ApiWebsocketModule.forRoot(),
    ApiGrpcModule,
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
    consumer.apply(ApiLoggerMiddleware).forRoutes('*');
  }
}

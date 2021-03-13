import { DynamicModule, Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { BackendAuthController } from './controller/auth.controller';
import { BackendAuthService } from './service/auth.service';

const moduleProviders: Provider[] = [BackendAuthService];

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwtsecret', // TODO: should be set from .env
    }),
  ],
  exports: [JwtModule],
  controllers: [BackendAuthController],
})
export class BackendAuthModule {
  public static forRoot(): DynamicModule {
    return {
      module: BackendAuthModule,
      providers: [...moduleProviders],
      exports: [...moduleProviders],
    };
  }
}

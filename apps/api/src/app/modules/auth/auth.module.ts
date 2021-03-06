import { DynamicModule, Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ApiAuthController } from './controller/auth.controller';
import { ApiAuthService } from './service/auth.service';

const moduleProviders: Provider[] = [ApiAuthService];

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwtsecret', // TODO: should be set from .env
    }),
  ],
  exports: [JwtModule],
  controllers: [ApiAuthController],
})
export class ApiAuthModule {
  public static forRoot(): DynamicModule {
    return {
      module: ApiAuthModule,
      providers: [...moduleProviders],
      exports: [...moduleProviders],
    };
  }
}

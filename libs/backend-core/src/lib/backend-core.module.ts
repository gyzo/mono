import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { BackendDotenvService } from './services/dotenv/dotenv.service';

@Global()
@Module({})
export class BackendCoreModule {
  public static forRoot(path?: string): DynamicModule {
    const dotenvServiceProvider: Provider = {
      provide: BackendDotenvService,
      useFactory: () => new BackendDotenvService(path),
    };
    return {
      module: BackendDotenvService,
      providers: [dotenvServiceProvider],
      exports: [dotenvServiceProvider],
    };
  }
}

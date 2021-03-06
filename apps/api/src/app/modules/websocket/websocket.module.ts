import { DynamicModule, Module, Provider } from '@nestjs/common';

import { ApiEventsGateway } from './gateway/events.gateway';

const moduleProviders: Provider[] = [ApiEventsGateway];

@Module({})
export class ApiWebsocketModule {
  public static forRoot(): DynamicModule {
    return {
      module: ApiWebsocketModule,
      providers: [...moduleProviders],
      exports: [...moduleProviders],
    };
  }
}

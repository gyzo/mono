import { DynamicModule, Module, Provider } from '@nestjs/common';

import { BackendEventsGateway } from './gateway/events.gateway';

const moduleProviders: Provider[] = [BackendEventsGateway];

@Module({
  providers: [BackendEventsGateway],
})
export class BackendWebsocketModule {
  public static forRoot(): DynamicModule {
    return {
      module: BackendWebsocketModule,
      providers: [...moduleProviders],
      exports: [...moduleProviders],
    };
  }
}

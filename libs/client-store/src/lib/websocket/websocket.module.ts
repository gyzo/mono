import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { IWebClientAppEnvironment } from '@mono/client-util';
import { NgxsModule } from '@ngxs/store';

import { WS_CONFIG } from './websocket.interface';
import { AppWebsocketState } from './websocket.store';

export const wsConfigProvider: (env: IWebClientAppEnvironment) => Provider = (
  env: IWebClientAppEnvironment,
) => ({
  provide: WS_CONFIG,
  useValue: {
    url: !env.production
      ? 'ws://localhost:8081/api/events'
      : 'wss://us-central1-nx-ng-starter.cloudfunctions.net/events',
  },
});

@NgModule({
  imports: [NgxsModule.forFeature([AppWebsocketState])],
})
export class AppWebsocketModule {
  /**
   * @note This method should be called only if websocker service should be imported in some root application module on its own.
   * @note In other cases AppClientStoreModule should be called with forRoot, and it will provide WS_CONFIG.
   */
  public static forRoot(env: IWebClientAppEnvironment): ModuleWithProviders<AppWebsocketModule> {
    return {
      ngModule: AppWebsocketModule,
      providers: [wsConfigProvider(env)],
    };
  }
}

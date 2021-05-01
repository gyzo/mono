import { ModuleWithProviders, NgModule } from '@angular/core';
import { IWebClientAppEnvironment } from '@mono/client-util';

import { AppGithubUserStoreModule } from './github-user/github-user.module';
import { AppHttpApiStoreModule } from './http-api/http-api.module';
import { AppHttpProgressStoreModule } from './http-progress/http-progress.module';
import { AppSidebarStoreModule } from './sidebar/sidebar.module';
import { AppThemeStoreModule } from './theme/theme.module';
import { AppUserStoreModule } from './user/user.module';
import { AppWebsocketStoreModule, wsConfigProvider } from './websocket/websocket.module';

@NgModule({
  imports: [
    AppHttpApiStoreModule,
    AppHttpProgressStoreModule.forRoot(),
    AppUserStoreModule,
    AppGithubUserStoreModule,
    AppSidebarStoreModule,
    AppWebsocketStoreModule,
    AppThemeStoreModule,
  ],
  exports: [
    AppHttpApiStoreModule,
    AppHttpProgressStoreModule,
    AppUserStoreModule,
    AppGithubUserStoreModule,
    AppSidebarStoreModule,
    AppWebsocketStoreModule,
    AppThemeStoreModule,
  ],
})
export class AppClientStoreModule {
  public static forRoot(env: IWebClientAppEnvironment): ModuleWithProviders<AppClientStoreModule> {
    return {
      ngModule: AppClientStoreModule,
      providers: [wsConfigProvider(env)],
    };
  }
}

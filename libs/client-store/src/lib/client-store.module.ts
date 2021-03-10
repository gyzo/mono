import { ModuleWithProviders, NgModule } from '@angular/core';
import { IWebClientAppEnvironment } from '@mono/client-util';

import { AppGithubUserModule } from './github-user/github-user.module';
import { AppHttpApiModule } from './http-api/http-api.module';
import { AppHttpProgressModule } from './http-progress/http-progress.module';
import { AppSidebarModule } from './sidebar/sidebar.module';
import { AppThemeModule } from './theme/theme.module';
import { AppUserModule } from './user/user.module';
import { AppWebsocketModule, wsConfigProvider } from './websocket/websocket.module';

@NgModule({
  imports: [
    AppHttpApiModule,
    AppHttpProgressModule.forRoot(),
    AppUserModule,
    AppGithubUserModule,
    AppSidebarModule,
    AppWebsocketModule,
    AppThemeModule,
  ],
  exports: [
    AppHttpApiModule,
    AppHttpProgressModule,
    AppUserModule,
    AppGithubUserModule,
    AppSidebarModule,
    AppWebsocketModule,
    AppThemeModule,
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

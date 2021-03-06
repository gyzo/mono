import { NgModule } from '@angular/core';

import { AppGithubUserModule } from './github-user/github-user.module';
import { AppHttpApiModule } from './http-api/http-api.module';
import { AppHttpProgressModule } from './http-progress/http-progress.module';
import { AppSidebarModule } from './sidebar/sidebar.module';
import { AppThemeModule } from './theme/theme.module';
import { AppUserModule } from './user/user.module';
import { AppWebsocketModule } from './websocket/websocket.module';

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
export class AppClientStoreModule {}

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppClientCoreModule } from '@mono/client-core';
import { AppClientMaterialModule } from '@mono/client-material';
import { AppClientStoreModule, AppWebsocketModule } from '@mono/client-store';
import { AppClientTranslateModule } from '@mono/client-translate';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppActivityComponent } from './components/activity/activity.component';
import { AppApplicationsComponent } from './components/applications/applications.component';
import { AppContactComponent } from './components/contact/contact.component';
import { AppIndexComponent } from './components/index/index.component';
import { AppLanguagesComponent } from './components/languages/languages.component';
import { AppOrganizationsComponent } from './components/organizations/organizations.component';
import { AppProfilesComponent } from './components/profiles/profiles.component';
import { AppRootComponent } from './components/root/root.component';
import { AppStatusBadgesComponent } from './components/status-badges/status-badges.component';
import { AppAutofocusDirective } from './directives/autofocus/autofocus.directive';

/**
 * Root application module.
 */
@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production, collapsed: true }),
    NgxsRouterPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppClientCoreModule.forRoot(environment),
    AppClientStoreModule,
    AppClientMaterialModule.forRoot(),
    AppWebsocketModule.forRoot(environment),
    AppClientTranslateModule.forRoot(),
    AppClientMaterialModule.forRoot(),
    AppRoutingModule,
  ],
  declarations: [
    AppRootComponent,
    AppIndexComponent,
    AppStatusBadgesComponent,
    AppProfilesComponent,
    AppOrganizationsComponent,
    AppLanguagesComponent,
    AppContactComponent,
    AppAutofocusDirective,
    AppApplicationsComponent,
    AppActivityComponent,
  ],
  entryComponents: [AppProfilesComponent, AppLanguagesComponent, AppContactComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppRootComponent],
})
export class AppPortfolioClientModule {}

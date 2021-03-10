import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppClientCoreModule } from '@mono/client-core';
import { AppClientMaterialModule } from '@mono/client-material';
import { AppClientStoreModule } from '@mono/client-store';
import { AppClientTranslateModule } from '@mono/client-translate';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppContentComponent } from './components/content/content.component';
import { AppRootComponent } from './components/root/root.component';

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
    AppClientMaterialModule.forRoot(),
    AppClientTranslateModule.forRoot(),
    AppClientStoreModule.forRoot(environment),
    AppRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppRootComponent, AppContentComponent],
  bootstrap: [AppRootComponent],
})
export class AppPortfolioClientModule {}

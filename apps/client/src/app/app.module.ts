import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppClientComponentsModule } from '@mono/client-components';
import { AppClientCoreModule } from '@mono/client-core';
import { AppClientMaterialModule } from '@mono/client-material';
import { AppClientStoreModule } from '@mono/client-store';
import { AppClientTranslateModule } from '@mono/client-translate';
import { EntityServiceClient } from '@mono/proto';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppRootComponent } from './components/root/root.component';

export const grpcProviders: Provider[] = [
  {
    provide: EntityServiceClient,
    useFactory: () => new EntityServiceClient(environment.envoyUrl ?? '', null, { withCredentials: 'true' }),
  },
];

/**
 * Application root module.
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
    AppClientComponentsModule,
    AppRoutingModule,
  ],
  providers: [...grpcProviders],
  declarations: [AppRootComponent],
  bootstrap: [AppRootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

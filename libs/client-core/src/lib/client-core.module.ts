import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@mono/client-util';

import { appClientCoreModuleProviders } from './providers/client-core-module.providers';

/**
 * Client core module.
 */
@NgModule({
  imports: [CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class AppClientCoreModule {
  /**
   * Provides services.
   * @param environment application environment, if omitted default environment will be provided.
   */
  public static forRoot(
    environment?: IWebClientAppEnvironment,
  ): ModuleWithProviders<AppClientCoreModule> {
    return {
      ngModule: AppClientCoreModule,
      providers: [
        ...appClientCoreModuleProviders,
        {
          provide: WEB_CLIENT_APP_ENV,
          useValue: environment,
        },
      ],
    };
  }
}

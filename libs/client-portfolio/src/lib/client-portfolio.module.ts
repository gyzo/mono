import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppClientCoreModule } from '@mono/client-core';
import { AppClientMaterialModule } from '@mono/client-material';
import { AppClientTranslateModule } from '@mono/client-translate';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { AppClientPortfolioRoutingModule } from './client-portfolio-routing.module';
import { AppPortfolioActivityComponent } from './components/activity/activity.component';
import { AppPortfolioApplicationsComponent } from './components/applications/applications.component';
import { AppPortfolioContactComponent } from './components/contact/contact.component';
import { AppPortfolioIndexComponent } from './components/index/index.component';
import { AppPortfolioLanguagesComponent } from './components/languages/languages.component';
import { AppPortfolioOrganizationsComponent } from './components/organizations/organizations.component';
import { AppPortfolioProfilesComponent } from './components/profiles/profiles.component';
import { AppPortfolioRootComponent } from './components/root/root.component';
import { AppPortfolioStatusBadgesComponent } from './components/status-badges/status-badges.component';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule,
    NgxsRouterPluginModule,
    NgxsFormPluginModule,
    AppClientCoreModule,
    AppClientMaterialModule,
    AppClientTranslateModule,
    AppClientPortfolioRoutingModule,
  ],
  declarations: [
    AppPortfolioRootComponent,
    AppPortfolioIndexComponent,
    AppPortfolioStatusBadgesComponent,
    AppPortfolioProfilesComponent,
    AppPortfolioOrganizationsComponent,
    AppPortfolioLanguagesComponent,
    AppPortfolioContactComponent,
    AppPortfolioApplicationsComponent,
    AppPortfolioActivityComponent,
  ],
  entryComponents: [
    AppPortfolioProfilesComponent,
    AppPortfolioLanguagesComponent,
    AppPortfolioContactComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppClientPortfolioModule {}

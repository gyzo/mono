import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppClientCoreModule } from '@mono/client-core';
import { AppClientMaterialModule } from '@mono/client-material';
import { AppClientTranslateModule } from '@mono/client-translate';

import { AppClientPortfolioRoutingModule } from './client-portfolio-routing.module';
import { AppPortfolioActivityComponent } from './components/activity/activity.component';
import { AppPortfolioContactComponent } from './components/contact/contact.component';
import { AppPortfolioIndexComponent } from './components/index/index.component';
import { AppPortfolioLanguagesComponent } from './components/languages/languages.component';
import { AppPortfolioOrganizationsComponent } from './components/organizations/organizations.component';
import { AppPortfolioProfilesComponent } from './components/profiles/profiles.component';
import { AppPortfolioRootComponent } from './components/root/root.component';
import { AppPortfolioStatusBadgesComponent } from './components/status-badges/status-badges.component';

@NgModule({
  imports: [
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

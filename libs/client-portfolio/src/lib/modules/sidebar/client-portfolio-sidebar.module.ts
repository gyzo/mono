import { NgModule } from '@angular/core';
import { AppClientCoreModule } from '@mono/client-core';
import { AppClientMaterialModule } from '@mono/client-material';

import { AppPortfolioApplicationsComponent } from '../../components/applications/applications.component';
import { AppClientPortfolioSidebarRoutingModule } from './client-portfolio-sidebar-routing.module';

@NgModule({
  imports: [AppClientCoreModule, AppClientMaterialModule, AppClientPortfolioSidebarRoutingModule],
  declarations: [AppPortfolioApplicationsComponent],
})
export class AppClientPortfolioSidebarModule {}

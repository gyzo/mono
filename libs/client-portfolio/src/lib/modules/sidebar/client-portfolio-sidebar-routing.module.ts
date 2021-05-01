import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppPortfolioApplicationsComponent } from '../../components/applications/applications.component';

const SIDEBAR_ROUTES: Route[] = [
  {
    path: 'root',
    component: AppPortfolioApplicationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(SIDEBAR_ROUTES)],
  exports: [RouterModule],
})
export class AppClientPortfolioSidebarRoutingModule {}

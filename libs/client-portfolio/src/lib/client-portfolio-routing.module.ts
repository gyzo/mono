import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppGithubUserResolver } from '@mono/client-store';

import { AppPortfolioIndexComponent } from './components/index/index.component';

const PORTFOLIO_ROUTES: Route[] = [
  {
    path: '',
    resolve: [AppGithubUserResolver],
    component: AppPortfolioIndexComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(PORTFOLIO_ROUTES)],
  exports: [RouterModule],
})
export class AppClientPortfolioRoutingModule {}

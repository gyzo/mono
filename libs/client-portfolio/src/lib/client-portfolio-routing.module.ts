import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppPortfolioIndexComponent } from './components/index/index.component';

/**
 * Application routes config.
 */
const ROUTES: Route[] = [
  {
    path: '',
    component: AppPortfolioIndexComponent,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

/**
 * Application routing module.
 */
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppClientPortfolioRoutingModule {}

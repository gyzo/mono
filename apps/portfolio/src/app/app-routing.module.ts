import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

/**
 * Application routes config.
 */
const ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () => import('@mono/client-portfolio').then(mod => mod.AppClientPortfolioModule),
  },
  {
    path: '',
    outlet: 'sidebar',
    loadChildren: () => import('@mono/client-portfolio').then(mod => mod.AppClientPortfolioSidebarModule),
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
  imports: [RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

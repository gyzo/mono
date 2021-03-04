import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@mono/client-components').then(mod => mod.AppClientComponentsModule),
  },
  {
    path: '',
    outlet: 'sidebar',
    loadChildren: () => import('@mono/client-sidebar').then(mod => mod.AppClientSidebarModule),
  },
  { path: '**', redirectTo: '' },
];

/**
 * Application routing module.
 */
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

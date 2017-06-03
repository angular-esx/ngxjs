import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PortalPage } from '../portal.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal',
        component: PortalPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class PortalPageRouteModule {}


export { PortalPageRouteModule };

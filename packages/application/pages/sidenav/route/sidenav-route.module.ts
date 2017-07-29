import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidenavPage } from '../sidenav.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'sidenav',
        component: SidenavPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class SidenavPageRouteModule {}


export { SidenavPageRouteModule };

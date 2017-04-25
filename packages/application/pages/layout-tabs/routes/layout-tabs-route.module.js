import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutTabsComponent } from '../layout-tabs.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'layout-tabs',
        component: LayoutTabsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LayoutTabsRouteModule {}

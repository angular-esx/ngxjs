import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutListComponent } from '../layout-list.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'layout-list',
        component: LayoutListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LayoutListRouteModule {}

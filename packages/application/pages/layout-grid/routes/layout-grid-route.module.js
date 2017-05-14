import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutGridComponent } from '../layout-grid.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'layout-grid',
        component: LayoutGridComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LayoutGridRouteModule { }

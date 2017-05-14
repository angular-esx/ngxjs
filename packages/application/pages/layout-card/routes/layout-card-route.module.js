import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutCardComponent } from '../layout-card.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'layout-card',
        component: LayoutCardComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LayoutCardRouteModule {}

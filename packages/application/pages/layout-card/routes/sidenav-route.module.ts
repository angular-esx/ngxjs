import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutCardPage } from '../layout-card.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'layout-card',
        component: LayoutCardPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class LayoutCardPageRouteModule {}


export { LayoutCardPageRouteModule };

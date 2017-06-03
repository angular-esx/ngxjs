import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ViewPage } from '../view.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'view',
        component: ViewPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class ViewPageRouteModule {}


export { ViewPageRouteModule };

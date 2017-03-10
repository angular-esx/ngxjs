import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DetailPage } from '../detail.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'detail',
        component: DetailPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class DetailPageRouteModule {}


export { DetailPageRouteModule };

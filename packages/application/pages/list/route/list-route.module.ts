import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ListPage } from '../list.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'list',
        component: ListPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class ListPageRouteModule {}


export { ListPageRouteModule };

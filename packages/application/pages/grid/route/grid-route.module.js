import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GridPage } from '../grid.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'grid',
        component: GridPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class GridPageRouteModule {}


export { GridPageRouteModule };

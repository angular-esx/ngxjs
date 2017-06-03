import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContainerPage } from '../container.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'container',
        component: ContainerPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class ContainerPageRouteModule {}


export { ContainerPageRouteModule };

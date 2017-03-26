import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColorPage } from '../color.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'color',
        component: ColorPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class ColorPageRouteModule {}


export { ColorPageRouteModule };

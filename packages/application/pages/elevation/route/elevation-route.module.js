import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ElevationPage } from '../elevation.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'elevation',
        component: ElevationPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class ElevationPageRouteModule {}


export { ElevationPageRouteModule };

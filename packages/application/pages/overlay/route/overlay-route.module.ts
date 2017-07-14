import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OverlayPage } from '../overlay.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'overlay',
        component: OverlayPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class OverlayPageRouteModule {}


export { OverlayPageRouteModule };

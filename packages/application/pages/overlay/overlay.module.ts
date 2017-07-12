import { NgModule } from '@angular/core';

import {
  NgxTypographyModule,
  MenuModule,
} from 'ngx-core';

import { OverlayPageRouteModule } from './route';

import { OverlayPage } from './overlay.page';


@NgModule({
  id: 'ngx-overlay-page',
  imports: [
    NgxTypographyModule,
    MenuModule,
    OverlayPageRouteModule,
  ],
  declarations: [OverlayPage],
  exports: [OverlayPage],
})
class OverlayPageModule {}


export { OverlayPageModule };

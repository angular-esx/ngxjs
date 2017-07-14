import { NgModule } from '@angular/core';
import { NgxContainerModule } from './container';
import { NgxGridModule } from './grid';
import { MenuModule } from './menu';
import { NgxOverlayModule } from './overlay';
import { NgxPortalModule } from './portal';
import { NgxTypographyModule } from './typography';
import { NgxViewModule } from './view';
import { NgxCardModule } from './card';
import { NgxSidenavModule } from './sidenav';

const MODULES = [
  NgxContainerModule,
  NgxGridModule,
  MenuModule,
  NgxOverlayModule,
  NgxPortalModule,
  NgxTypographyModule,
  NgxViewModule,
  NgxCardModule,
  NgxSidenavModule,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class NgxUIModule {}

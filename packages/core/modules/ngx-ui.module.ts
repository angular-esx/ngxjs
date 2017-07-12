import { NgModule } from '@angular/core';
import { NgxContainerModule } from './container';
import { NgxGridModule } from './grid';
import { MenuModule } from './menu';
import { NgxOverlayModule } from './overlay';
import { NgxPortalModule } from './portal';
import { NgxTypographyModule } from './typography';
import { NgxViewModule } from './view';


const MODULES = [
  NgxContainerModule,
  NgxGridModule,
  MenuModule,
  NgxOverlayModule,
  NgxPortalModule,
  NgxTypographyModule,
  NgxViewModule,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class NgxUIModule {}

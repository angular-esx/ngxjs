import { NgModule } from '@angular/core';

import { NgxCardModule } from './card';
import { NgxContainerModule } from './container';
import { NgxGridModule } from './grid';
import { MenuModule } from './menu';
import { NgxOverlayModule } from './overlay';
import { NgxPortalModule } from './portal';
import { NgxSidenavModule } from './sidenav';
import { NgxTypographyModule } from './typography';
import { NgxViewModule } from './view';


const _MODULES = [
  NgxCardModule,
  NgxContainerModule,
  NgxGridModule,
  MenuModule,
  NgxOverlayModule,
  NgxPortalModule,
  NgxSidenavModule,
  NgxTypographyModule,
  NgxViewModule,
];

@NgModule({
  imports: _MODULES,
})
export class NgxUIModule {}

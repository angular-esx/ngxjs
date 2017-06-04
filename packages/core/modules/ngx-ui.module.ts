import { NgModule } from '@angular/core';
import { NgxContainerModule } from './container';
import { NgxGridModule } from './grid';
import { NgxPortalModule } from './portal';
import { NgxTypographyModule } from './typography';
import { NgxViewModule } from './view';


const MODULES = [
  NgxContainerModule,
  NgxGridModule,
  NgxPortalModule,
  NgxTypographyModule,
  NgxViewModule,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class NgxUIModule {}

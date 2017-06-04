import { NgModule } from '@angular/core';
import { NgxContainerModule } from './container';
import { NgxGridModule } from './grid';
import { NgxPortalModule } from './portal';
import { NgxTypographyModule } from './typography';
import { NgxViewModule } from './view';
import { NgxRendererModule } from './renderer';
import { NgxCardModule } from './card';

const MODULES = [
  NgxContainerModule,
  NgxGridModule,
  NgxPortalModule,
  NgxTypographyModule,
  NgxViewModule,
  NgxRendererModule,
  NgxCardModule,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class NgxjsModule {}

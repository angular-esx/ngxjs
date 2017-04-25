import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxjsModule } from 'ngx-core';
import { LayoutGridComponent } from './layout-grid.component';
import { LayoutGridRouteModule } from './routes';

@NgModule({
  imports: [CommonModule, LayoutGridRouteModule, NgxjsModule],
  declarations: [LayoutGridComponent],
  exports: [],
  providers: [],
})
export class LayoutGridModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxjsModule } from 'ngx-core';
import { LayoutCardComponent } from './layout-card.component';
import { LayoutCardRouteModule } from './routes';

@NgModule({
  imports: [CommonModule, LayoutCardRouteModule, NgxjsModule],
  declarations: [LayoutCardComponent],
  exports: [],
  providers: [],
})
export class LayoutCardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxjsModule } from 'ngx-core';
import { LayoutListComponent } from './layout-list.component';
import { LayoutListRouteModule } from './routes';

@NgModule({
  imports: [CommonModule, LayoutListRouteModule, NgxjsModule],
  declarations: [LayoutListComponent],
  exports: [],
  providers: [],
})
export class LayoutListModule { }

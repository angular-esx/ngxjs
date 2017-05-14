import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxjsModule } from 'ngx-core';
import { LayoutTabsComponent } from './layout-tabs.component';
import { LayoutTabsRouteModule } from './routes';

@NgModule({
  imports: [CommonModule, LayoutTabsRouteModule, NgxjsModule],
  declarations: [LayoutTabsComponent],
  exports: [],
  providers: [],
})
export class LayoutTabsModule { }

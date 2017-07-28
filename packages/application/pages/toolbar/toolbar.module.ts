import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxToolbarModule } from 'ngx-core';

import { ToolbarPageRouteModule } from './route';

import { ToolbarPage } from './toolbar.page';


@NgModule({
  id: 'ngx-toolbar-page',
  imports: [
    CommonModule,
    NgxToolbarModule,
    ToolbarPageRouteModule,
  ],
  declarations: [ToolbarPage],
  exports: [ToolbarPage],
})
class ToolbarPageModule {}


export { ToolbarPageModule };

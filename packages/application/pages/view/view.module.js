import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxViewModule } from 'ngx-core';

import { ViewPageRouteModule } from './route';

import { ViewPage } from './view.page';


@NgModule({
  id: 'ngx-view-page',
  imports: [
    CommonModule,
    NgxViewModule,
    ViewPageRouteModule,
  ],
  declarations: [ViewPage],
  exports: [ViewPage],
})
class ViewPageModule {}


export { ViewPageModule };

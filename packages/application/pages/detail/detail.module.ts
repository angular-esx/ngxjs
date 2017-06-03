import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DenseDetailModule,
  EnglishDetailModule,
  TallDetailModule,
} from './modules';
import { DetailPageRouteModule } from './route';
import { DetailPage } from './detail.page';


@NgModule({
  imports: [
    CommonModule,
    DenseDetailModule,
    EnglishDetailModule,
    TallDetailModule,
    DetailPageRouteModule,
  ],
  declarations: [DetailPage],
  exports: [DetailPage],
})
class DetailPageModule {}


export { DetailPageModule };

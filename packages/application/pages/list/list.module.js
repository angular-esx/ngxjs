import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DenseListModule,
  EnglishListModule,
  TallListModule,
} from './modules';
import { ListPageRouteModule } from './route';
import { ListPage } from './list.page';


@NgModule({
  imports: [
    CommonModule,
    DenseListModule,
    EnglishListModule,
    TallListModule,
    ListPageRouteModule,
  ],
  declarations: [ListPage],
  exports: [ListPage],
})
class ListPageModule {}


export { ListPageModule };

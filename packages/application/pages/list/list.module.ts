import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DenseListModule,
  EnglishListModule,
  TallListModule,
} from './modules';
import { ListPageRouteModule } from './route';
import { ListPageComponent } from './list.page';


@NgModule({
  imports: [
    CommonModule,
    DenseListModule,
    EnglishListModule,
    TallListModule,
    ListPageRouteModule,
  ],
  declarations: [ListPageComponent],
  exports: [ListPageComponent],
})
class ListPageModule {}


export { ListPageModule };

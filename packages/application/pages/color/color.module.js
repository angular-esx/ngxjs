import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorPageRouteModule } from './route';

import { ColorPage } from './color.page';


@NgModule({
  id: 'ngx-color-page',
  imports: [
    ColorPageRouteModule,
    CommonModule,
  ],
  declarations: [ColorPage],
  exports: [ColorPage],
})
class ColorPageModule {}


export { ColorPageModule };

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemePageRouteModule } from './route';

import { ThemePage } from './theme.page';


@NgModule({
  id: 'ngx-theme-page',
  imports: [
    ThemePageRouteModule,
    CommonModule,
  ],
  declarations: [ThemePage],
  exports: [ThemePage],
})
class ThemePageModule {}


export { ThemePageModule };

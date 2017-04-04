import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackgroundModule } from './modules';
import { ThemePageRouteModule } from './route';
import { ThemePage } from './theme.page';


@NgModule({
  id: 'ngx-theme-page',
  imports: [
    CommonModule,
    BackgroundModule,
    ThemePageRouteModule,
  ],
  declarations: [ThemePage],
  exports: [ThemePage],
})
class ThemePageModule {}


export { ThemePageModule };

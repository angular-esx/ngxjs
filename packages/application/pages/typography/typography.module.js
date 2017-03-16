import { NgModule } from '@angular/core';

import {
  DenseScriptModule,
  EnglishScriptModule,
  TallScriptModule,
} from './modules';
import { TypographyPageRouteModule } from './route';
import { TypographyPage } from './typography.page';


@NgModule({
  imports: [
    DenseScriptModule,
    EnglishScriptModule,
    TallScriptModule,
    TypographyPageRouteModule,
  ],
  declarations: [TypographyPage],
  exports: [TypographyPage],
})
class TypographyPageModule {}


export { TypographyPageModule };

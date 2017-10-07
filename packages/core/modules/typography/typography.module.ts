import { NgModule } from '@angular/core';

import { NgxRenderServiceModule } from '../../services';
import { NgxTypographyDirective } from './typography.directive';


const _DIRECTIVES = [
  NgxTypographyDirective,
];

@NgModule({
  imports: [NgxRenderServiceModule],
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
export class NgxTypographyModule {}

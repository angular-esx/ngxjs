import { NgModule } from '@angular/core';

import { NgxTypographyDirective } from './typography.directive';


const _DIRECTIVES = [
  NgxTypographyDirective,
];

@NgModule({
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
class NgxTypographyModule {}


export { NgxTypographyModule };

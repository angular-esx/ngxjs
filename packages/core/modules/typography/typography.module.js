import { NgModule } from '@angular/core';

import { ngxTypographyDirective } from './typography.directive';


const _DIRECTIVES = [
  ngxTypographyDirective,
];

@NgModule({
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
class ngxTypographyModule {}


export { ngxTypographyModule };

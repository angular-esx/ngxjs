import { NgModule } from '@angular/core';

import { ngxDisplay1Directive } from './display1.directive';
import { ngxDisplay2Directive } from './display2.directive';
import { ngxDisplay3Directive } from './display3.directive';
import { ngxDisplay4Directive } from './display4.directive';
import { ngxHeadlineDirective } from './headline.directive';
import { ngxTitleDirective } from './title.directive';
import { ngxSubheading1Directive } from './subheading1.directive';
import { ngxSubheading2Directive } from './subheading2.directive';
import { ngxBody1Directive } from './body1.directive';
import { ngxBody2Directive } from './body2.directive';
import { ngxCaptionDirective } from './caption.directive';


const _DIRECTIVES = [
  ngxDisplay1Directive,
  ngxDisplay2Directive,
  ngxDisplay3Directive,
  ngxDisplay4Directive,
  ngxHeadlineDirective,
  ngxTitleDirective,
  ngxSubheading1Directive,
  ngxSubheading2Directive,
  ngxBody1Directive,
  ngxBody2Directive,
  ngxCaptionDirective,
];

@NgModule({
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
class ngxTypographyModule {}


export { ngxTypographyModule };

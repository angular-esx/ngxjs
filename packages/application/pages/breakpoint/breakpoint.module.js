import { NgModule } from '@angular/core';

import { BreakpointPageRouteModule } from './route';

import { BreakpointPage } from './breakpoint.page';


@NgModule({
  imports: [
    BreakpointPageRouteModule,
  ],
  declarations: [BreakpointPage],
  exports: [BreakpointPage],
})
class BreakpointPageModule {}


export { BreakpointPageModule };

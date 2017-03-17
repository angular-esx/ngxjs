import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreakpointPage } from '../breakpoint.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'breakpoint',
        component: BreakpointPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class BreakpointPageRouteModule {}


export { BreakpointPageRouteModule };

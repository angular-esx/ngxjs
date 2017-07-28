import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToolbarPage } from '../toolbar.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'toolbar',
        component: ToolbarPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class ToolbarPageRouteModule {}


export { ToolbarPageRouteModule };

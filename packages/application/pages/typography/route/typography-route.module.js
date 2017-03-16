import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TypographyPage } from '../typography.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'typography',
        component: TypographyPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class TypographyPageRouteModule {}


export { TypographyPageRouteModule };

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThemePage } from '../theme.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'theme',
        component: ThemePage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class ThemePageRouteModule {}


export { ThemePageRouteModule };

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardPage } from '../card.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'card',
        component: CardPage,
      },
    ]),
  ],
  exports: [RouterModule],
})
class CardPageRouteModule {}


export { CardPageRouteModule };

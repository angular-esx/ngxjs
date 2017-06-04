import { NgModule } from '@angular/core';

import { NgxCardModule } from 'ngx-core';

import { CardPageRouteModule } from './route';

import { CardPage } from './card.page';


@NgModule({
  id: 'ngx-card-page',
  imports: [
    NgxCardModule,
    CardPageRouteModule,
  ],
  declarations: [CardPage],
  exports: [CardPage],
})
class CardPageModule {}


export { CardPageModule };

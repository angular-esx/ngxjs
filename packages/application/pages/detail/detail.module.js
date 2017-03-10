import { NgModule } from '@angular/core';

import { DetailPageRouteModule } from './route';

import { DetailPage } from './detail.page';


@NgModule({
  id: 'ngx-detail-page',
  imports: [
    DetailPageRouteModule,
  ],
  declarations: [DetailPage],
  exports: [DetailPage],
})
class DetailPageModule {}


export { DetailPageModule };

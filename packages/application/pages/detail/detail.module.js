import { NgModule } from '@angular/core';

import { DetailPageRouteModule } from './route';

import { DetailPage } from './detail.page';


@NgModule({
  imports: [
    DetailPageRouteModule,
  ],
  declarations: [DetailPage],
  exports: [DetailPage],
})
class DetailPageModule {}


export { DetailPageModule };

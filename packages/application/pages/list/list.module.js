import { NgModule } from '@angular/core';

import { ListPageRouteModule } from './route';

import { ListPage } from './list.page';


@NgModule({
  imports: [
    ListPageRouteModule,
  ],
  declarations: [ListPage],
  exports: [ListPage],
})
class ListPageModule {}


export { ListPageModule };

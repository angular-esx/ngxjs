import { NgModule } from '@angular/core';

import { ListPageRouteModule } from './route';

import { ListPage } from './list.page';


@NgModule({
  id: 'ngx-list-page',
  imports: [
    ListPageRouteModule,
  ],
  declarations: [ListPage],
  exports: [ListPage],
})
class ListPageModule {}


export { ListPageModule };

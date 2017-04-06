import { NgModule } from '@angular/core';

import { NgxGridModule } from 'ngx-core';

import { GridPageRouteModule } from './route';

import { GridPage } from './grid.page';


@NgModule({
  id: 'ngx-grid-page',
  imports: [
    NgxGridModule,
    GridPageRouteModule,
  ],
  declarations: [GridPage],
  exports: [GridPage],
})
class GridPageModule {}


export { GridPageModule };

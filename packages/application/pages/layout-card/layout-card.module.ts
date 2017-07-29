import { NgModule } from '@angular/core';

import { NgxSidenavModule, NgxCardModule, NgxGridModule } from 'ngx-core';

import { LayoutCardPageRouteModule } from './routes';

import { LayoutCardPage } from './layout-card.page';


@NgModule({
  id: 'ngx-layout-card-page',
  imports: [
    NgxSidenavModule,
    NgxCardModule,
    NgxGridModule,
    LayoutCardPageRouteModule,
  ],
  declarations: [LayoutCardPage],
  exports: [LayoutCardPage],
})
class LayoutCardPageModule {}


export { LayoutCardPageModule };

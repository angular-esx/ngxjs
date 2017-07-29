import { NgModule } from '@angular/core';

import { NgxSidenavModule } from 'ngx-core';

import { SidenavPageRouteModule } from './route';

import { SidenavPage } from './sidenav.page';


@NgModule({
  id: 'ngx-sidenav-page',
  imports: [
    NgxSidenavModule,
    SidenavPageRouteModule,
  ],
  declarations: [SidenavPage],
  exports: [SidenavPage],
})
class SidenavPageModule {}


export { SidenavPageModule };

import { NgModule } from '@angular/core';

import {
  NgxTypographyModule,
  NgxPortalModule,
} from 'ngx-core';

import { PortalPageRouteModule } from './route';

import {
  PortalPage,
  PortalComponentExample,
} from './portal.page';


@NgModule({
  id: 'ngx-portal-page',
  imports: [
    NgxTypographyModule,
    NgxPortalModule,
    PortalPageRouteModule,
  ],
  declarations: [
    PortalPage,
    PortalComponentExample,
  ],
  entryComponents: [PortalComponentExample],
  exports: [PortalPage],
})
class PortalPageModule {}


export { PortalPageModule };

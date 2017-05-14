import { NgModule } from '@angular/core';

import { NgxContainerModule } from 'ngx-core';

import { ContainerPageRouteModule } from './route';

import { ContainerPage } from './container.page';


@NgModule({
  id: 'ngx-container-page',
  imports: [
    NgxContainerModule,
    ContainerPageRouteModule,
  ],
  declarations: [ContainerPage],
  exports: [ContainerPage],
})
class ContainerPageModule {}


export { ContainerPageModule };

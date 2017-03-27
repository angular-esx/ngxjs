import { NgModule } from '@angular/core';

import { ElevationPageRouteModule } from './route';

import { ElevationPage } from './elevation.page';


@NgModule({
  imports: [
    ElevationPageRouteModule,
  ],
  declarations: [ElevationPage],
  exports: [ElevationPage],
})
class ElevationPageModule {}


export { ElevationPageModule };

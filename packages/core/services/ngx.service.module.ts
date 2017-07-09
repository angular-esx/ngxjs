import { NgModule } from '@angular/core';

import { NgxBrowserPlatformService } from './platform';
import { NgxRenderService } from './render';


@NgModule({
  id: 'ngx-service',
  providers: [
    NgxBrowserPlatformService,
    NgxRenderService,
  ],
})
class NgxServiceModule {}


export { NgxServiceModule };

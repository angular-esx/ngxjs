import { NgModule } from '@angular/core';

import { NgxBrowserPlatformServiceModule } from './browser-platform';
import { NgxRenderServiceModule } from './render';


@NgModule({
  id: 'ngx-service',
  providers: [
    NgxBrowserPlatformServiceModule,
    NgxRenderServiceModule,
  ],
})
export class NgxServiceModule {}

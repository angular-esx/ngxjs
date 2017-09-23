import { NgModule } from '@angular/core';

import { ngxBrowserPlatformServiceProvider } from './browser-platform.service';


@NgModule({
  id: 'ngx-browser-platform-service',
  providers: [ngxBrowserPlatformServiceProvider],
})
export class NgxBrowserPlatformServiceModule {}

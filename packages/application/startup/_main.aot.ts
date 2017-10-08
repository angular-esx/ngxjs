import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from 'ngx-infrastructure';

import { NgxHmrAppModuleNgFactory } from '../../../_compiled/packages/application/startup/_app.module.hmr.ngfactory';
import { NgxBrowserAppModuleNgFactory } from '../../../_compiled/packages/application/startup/_app.module.browser.ngfactory';


if (environment.isUniversalBrowser) {
  platformBrowserDynamic().bootstrapModuleFactory(NgxBrowserAppModuleNgFactory);
}
else {
  platformBrowserDynamic().bootstrapModuleFactory(NgxHmrAppModuleNgFactory);
}

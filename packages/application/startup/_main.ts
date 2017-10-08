import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { hmrModule  } from '@angularclass/hmr';

import { environment } from 'ngx-infrastructure';

import { NgxHmrAppModule } from './_app.module.hmr';
import { NgxBrowserAppModule } from './_app.module.browser';


switch (document.readyState) {
  case 'loading':
    document.addEventListener('DOMContentLoaded', _handleDomReady, false);
    break;
  default:
    _bootstrap();
}


function _bootstrap (): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(environment.isUniversalBrowser ? NgxBrowserAppModule : NgxHmrAppModule)
    .then((ngModuleRef: any) => {
      // `module` global ref for webpackhmr
      return hmrModule(ngModuleRef, module);
    });
}

function _handleDomReady () {
  document.removeEventListener('DOMContentLoaded', _handleDomReady, false);
  _bootstrap();
}

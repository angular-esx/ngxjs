import { NgModule } from '@angular/core';

import {
  NgxBrowserPlatformServiceModule,
  NgxRenderServiceModule,
} from '../../services';
import { NgxPortalModule } from '../portal';
import {
  ngxOverlayContainerServiceProvider,
  ngxOverlayServiceProvider,
  ngxPositionStrategyServiceProvider,
  ngxScrollServiceProvider,
  ngxScrollStrategyServiceProvider,
  ngxViewportServiceProvider,
} from './services';
import { NgxScrollableDirective } from './scrollabe.directive';
import { NgxOriginOverlayDirective } from './origin-overlay.directive';
import { NgxConnectedOverlayDirective } from './connected-overlay.directive';


const _DIRECTIVES = [
  NgxScrollableDirective,
  NgxOriginOverlayDirective,
  NgxConnectedOverlayDirective,
];

@NgModule({
  id: 'ngx-overlay',
  imports: [
    NgxPortalModule,
    NgxBrowserPlatformServiceModule,
    NgxRenderServiceModule,
  ],
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
  providers: [
    ngxOverlayContainerServiceProvider,
    ngxOverlayServiceProvider,
    ngxPositionStrategyServiceProvider,
    ngxScrollServiceProvider,
    ngxScrollStrategyServiceProvider,
    ngxViewportServiceProvider,
  ],
})
export class NgxOverlayModule {}

import { NgModule } from '@angular/core';

import {
  NgxBrowserPlatformServiceModule,
  NgxRenderServiceModule,
} from '../../services';
import { NgxPortalModule } from '../portal';
import {
  ngxScrollProvider,
  ngxViewportProvider,
  NgxPositionStrategyService,
  NgxScrollStrategyService,
  NgxOverlayService,
  NgxOverlayContainerService,
} from './services';
import { NgxScrollableDirective } from './scrollabe.directive';
import { NgxOriginOverlayDirective } from './origin-overlay.directive';
import { NgxConnectedOverlayDirective } from './connected-overlay.directive';


@NgModule({
  id: 'ngx-overlay',
  imports: [
    NgxPortalModule,
    NgxBrowserPlatformServiceModule,
    NgxRenderServiceModule,
  ],
  declarations: [
    NgxScrollableDirective,
    NgxOriginOverlayDirective,
    NgxConnectedOverlayDirective,
  ],
  exports: [
    NgxScrollableDirective,
    NgxOriginOverlayDirective,
    NgxConnectedOverlayDirective,
  ],
  providers: [
    ngxScrollProvider,
    ngxViewportProvider,
    NgxPositionStrategyService,
    NgxScrollStrategyService,
    NgxOverlayService,
    NgxOverlayContainerService,
  ],
})
class NgxOverlayModule {}


export { NgxOverlayModule };

import {
  Optional,
  SkipSelf,
  Injectable,
  Inject,
} from '@angular/core';

import { NgxBrowserPlatformService } from '../../../services';
import {
  NgxOverlayContainer,
  NgxFullscreenOverlayContainer,
} from '../models';


/**
 * A factory is used to create instances of INgxOverlayContainer
 */
@Injectable()
class NgxOverlayContainerService {
  constructor (@Inject(NgxBrowserPlatformService) protected _browserPlatformService: NgxBrowserPlatformService) {}

  createOverlayContainer (): NgxOverlayContainer {
    return new NgxOverlayContainer(this._browserPlatformService);
  }

  createFullscreenOverlayContainer (): NgxFullscreenOverlayContainer {
    return new NgxFullscreenOverlayContainer(this._browserPlatformService);
  }
}


function ngxOverlayContainerFactory (parentOverlayContainerService: NgxOverlayContainerService, browserPlatformService: NgxBrowserPlatformService) {
  return parentOverlayContainerService || new NgxOverlayContainerService(browserPlatformService);
}
 

export {
  NgxOverlayContainerService,
  ngxOverlayContainerFactory,
};
/**
 * If there is already a NgxOverlayContainerService available, use that. Otherwise, provide a new one.
 */
export const ngxOverlayContainerProvider = {  
  provide: NgxOverlayContainerService,
  deps: [[new Optional(), new SkipSelf(), NgxOverlayContainerService], NgxBrowserPlatformService],
  useFactory: ngxOverlayContainerFactory,
};

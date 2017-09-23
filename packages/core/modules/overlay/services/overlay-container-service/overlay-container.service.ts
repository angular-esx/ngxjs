import {
  Optional,
  SkipSelf,
  Injectable,
  Inject,
} from '@angular/core';

import {
  INgxBrowserPlatformService,
  NgxBrowserPlatformService,
} from '../../../../services';
import {
  INgxOverlayContainer,
  NgxOverlayContainer,
  INgxFullscreenOverlayContainer,
  NgxFullscreenOverlayContainer,
} from '../../models';
import { INgxOverlayContainerService } from './overlay-container-service.interface';


/**
 * A factory is used to create instances of INgxOverlayContainer
 */
@Injectable()
class NgxOverlayContainerService implements INgxOverlayContainerService {
  constructor (@Inject(NgxBrowserPlatformService) protected _browserPlatformService: INgxBrowserPlatformService) {}

  createOverlayContainer (): INgxOverlayContainer {
    return new NgxOverlayContainer(this._browserPlatformService);
  }

  createFullscreenOverlayContainer (): INgxFullscreenOverlayContainer {
    return new NgxFullscreenOverlayContainer(this._browserPlatformService);
  }
}


function ngxOverlayContainerFactory (
  parentOverlayContainerService: INgxOverlayContainerService,
  browserPlatformService: INgxBrowserPlatformService) {
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

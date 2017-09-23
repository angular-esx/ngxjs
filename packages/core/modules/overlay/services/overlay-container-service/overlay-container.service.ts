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
export class NgxOverlayContainerService implements INgxOverlayContainerService {
  constructor (@Inject(NgxBrowserPlatformService) protected _browserPlatformService: INgxBrowserPlatformService) {}

  createOverlayContainer (): INgxOverlayContainer {
    return new NgxOverlayContainer(this._browserPlatformService);
  }

  createFullscreenOverlayContainer (): INgxFullscreenOverlayContainer {
    return new NgxFullscreenOverlayContainer(this._browserPlatformService);
  }
}


export function ngxOverlayContainerServiceFactory (
  parentOverlayContainerService: INgxOverlayContainerService,
  browserPlatformService: INgxBrowserPlatformService) {
  return parentOverlayContainerService || new NgxOverlayContainerService(browserPlatformService);
}
/**
 * If there is already a NgxOverlayContainerService available, use that. Otherwise, provide a new one.
 */
export const ngxOverlayContainerServiceProvider = {  
  provide: NgxOverlayContainerService,
  deps: [
    [new Optional(), new SkipSelf(), NgxOverlayContainerService],
    NgxBrowserPlatformService,
  ],
  useFactory: ngxOverlayContainerServiceFactory,
};

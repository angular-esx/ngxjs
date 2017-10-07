import {
  Injectable,
  Inject,
  Optional,
  SkipSelf,
} from '@angular/core';

import {
  INgxBrowserPlatformService,
  NgxBrowserPlatformService,
} from '../../../../services';
import {
  NgxConnectionPositionType,
  INgxGlobalPositionStrategy,
  NgxGlobalPositionStrategy,
  INgxConnectedPositionStrategy,
  NgxConnectedPositionStrategy,
} from '../../models';
import {
  INgxViewportService,
  NgxViewportService,
} from '../viewport-service';
import { INgxPositionStrategyService } from './position-strategy-service.interface';


/**
 * A factory is used to create instances of INgxPositionStrategy
 */
@Injectable()
export class NgxPositionStrategyService implements INgxPositionStrategyService {
  constructor (
    @Inject(NgxViewportService) protected _viewportService: INgxViewportService,
    @Inject(NgxBrowserPlatformService) protected _browserPlatformService: INgxBrowserPlatformService
  ){}


  createGlobalPositionStrategy (): INgxGlobalPositionStrategy {
    return new NgxGlobalPositionStrategy(this._browserPlatformService);
  }

  createConnectedPositionStrategy (
    originElement: HTMLElement,
    originPosition: NgxConnectionPositionType,
    overlayPosition: NgxConnectionPositionType
  ): INgxConnectedPositionStrategy {
    return new NgxConnectedPositionStrategy(
      originElement,
      originPosition,
      overlayPosition,
      this._viewportService,
      this._browserPlatformService
    );
  }
}

export function ngxPositionStrategyServiceFactory (
  parentPositionStrategyService: INgxPositionStrategyService,
  viewportService: INgxViewportService,
  browserPlatformService: INgxBrowserPlatformService) {
  return parentPositionStrategyService || new NgxPositionStrategyService(
    viewportService,
    browserPlatformService
  );
}
/**
 * If there is already a NgxPositionStrategyService available, use that. Otherwise, provide a new one.
 */
export const ngxPositionStrategyServiceProvider = {  
  provide: NgxPositionStrategyService,
  deps: [
    [new Optional(), new SkipSelf(), NgxPositionStrategyService],
    NgxViewportService,
    NgxBrowserPlatformService,
  ],
  useFactory: ngxPositionStrategyServiceFactory,
};

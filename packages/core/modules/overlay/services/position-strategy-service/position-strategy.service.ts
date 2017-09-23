import {
  Injectable,
  Inject,
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
class NgxPositionStrategyService implements INgxPositionStrategyService {
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


export { NgxPositionStrategyService };

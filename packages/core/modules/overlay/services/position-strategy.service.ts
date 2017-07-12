import {
  Injectable,
  Inject,
} from '@angular/core';

import { NgxBrowserPlatformService } from '../../../services';
import {
  NgxConnectionPositionType,
  NgxGlobalPositionStrategy,
  NgxConnectedPositionStrategy,
} from '../models';
import { NgxViewportService } from './viewport.service';


/**
 * A factory is used to create instances of INgxPositionStrategy
 */
@Injectable()
class NgxPositionStrategyService {
  constructor (
    @Inject(NgxViewportService) protected _viewportService: NgxViewportService,
    @Inject(NgxBrowserPlatformService) protected _browserPlatformService: NgxBrowserPlatformService
  ){}


  createGlobalPositionStrategy (): NgxGlobalPositionStrategy {
    return new NgxGlobalPositionStrategy(this._browserPlatformService);
  }

  createConnectedPositionStrategy (
    originElement: HTMLElement,
    originPosition: NgxConnectionPositionType,
    overlayPosition: NgxConnectionPositionType
  ): NgxConnectedPositionStrategy {
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

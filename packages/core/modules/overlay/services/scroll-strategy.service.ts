import {
  Injectable,
  Inject,
} from '@angular/core';

import { NgxBrowserPlatformService } from '../../../services';
import {
  NgxBlockScrollStrategy,
  NgxCloseScrollStrategy,
  NgxNoopScrollStrategy,
  NgxRepositionScrollStrategy,
  NgxRepositionScrollStrategyConfig,
} from '../models';
import { NgxScrollService } from './scroll.service';
import { NgxViewportService } from './viewport.service';


/**
 * A factory is used to create instances of INgxScrollStrategy
 */
@Injectable()
class NgxScrollStrategyService {
  constructor (
    @Inject(NgxScrollService) protected _scrollService: NgxScrollService,
    @Inject(NgxViewportService) protected _viewportService: NgxViewportService,
    @Inject(NgxBrowserPlatformService) protected _browserPlatformService: NgxBrowserPlatformService
  ) {}

  createNoopScrollStrategy (): NgxNoopScrollStrategy {
    return new NgxNoopScrollStrategy();
  }

  createCloseScrollStrategy (): NgxCloseScrollStrategy {
    return new NgxCloseScrollStrategy(this._scrollService);
  };

  createBlockScrollStrategy (): NgxBlockScrollStrategy {
    return new NgxBlockScrollStrategy(this._viewportService, this._browserPlatformService);
  }

  createRepositionScrollStrategy (config?: NgxRepositionScrollStrategyConfig): NgxRepositionScrollStrategy {
    return new NgxRepositionScrollStrategy(this._scrollService, config);
  }
}


export { NgxScrollStrategyService };

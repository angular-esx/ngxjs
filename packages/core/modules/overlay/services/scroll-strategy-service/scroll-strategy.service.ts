import {
  Injectable,
  Inject,
} from '@angular/core';

import {
  INgxBrowserPlatformService,
  NgxBrowserPlatformService,
} from '../../../../services';
import {
  INgxBlockScrollStrategy,
  NgxBlockScrollStrategy,
  INgxCloseScrollStrategy,
  NgxCloseScrollStrategy,
  INgxNoopScrollStrategy,
  NgxNoopScrollStrategy,
  INgxRepositionScrollStrategy,
  NgxRepositionScrollStrategy,
  NgxRepositionScrollStrategyConfig,
} from '../../models';
import {
  INgxScrollService,
  NgxScrollService,
} from '../scroll-service';
import {
  INgxViewportService,
  NgxViewportService,
} from '../viewport-service';
import { INgxScrollStrategyService } from './scroll-strategy-service.interface';


/**
 * A factory is used to create instances of INgxScrollStrategy
 */
@Injectable()
class NgxScrollStrategyService implements INgxScrollStrategyService {
  constructor (
    @Inject(NgxScrollService) protected _scrollService: INgxScrollService,
    @Inject(NgxViewportService) protected _viewportService: INgxViewportService,
    @Inject(NgxBrowserPlatformService) protected _browserPlatformService: INgxBrowserPlatformService
  ) {}

  createNoopScrollStrategy (): INgxNoopScrollStrategy {
    return new NgxNoopScrollStrategy();
  }

  createCloseScrollStrategy (): INgxCloseScrollStrategy {
    return new NgxCloseScrollStrategy(this._scrollService);
  };

  createBlockScrollStrategy (): INgxBlockScrollStrategy {
    return new NgxBlockScrollStrategy(this._viewportService, this._browserPlatformService);
  }

  createRepositionScrollStrategy (config?: NgxRepositionScrollStrategyConfig): INgxRepositionScrollStrategy {
    return new NgxRepositionScrollStrategy(this._scrollService, config);
  }
}


export { NgxScrollStrategyService };

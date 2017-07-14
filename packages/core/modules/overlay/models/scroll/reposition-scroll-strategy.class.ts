import { Subscription } from 'rxjs/Subscription';

import { NgxScrollService } from '../../services';
import { NgxOverlayRef } from '../overlay';
import { INgxScrollStrategy } from './scroll-strategy.interface';


class NgxRepositionScrollStrategyConfig {
  scrollThrottle?: number = 0;
}

/**
 * Strategy that will update the element position as the user is scrolling.
 */
class NgxRepositionScrollStrategy implements INgxScrollStrategy {
  protected _config: NgxRepositionScrollStrategyConfig;
  protected _overlayRef: NgxOverlayRef;

  protected _subscription: Subscription;


  constructor (
    protected _scrollService: NgxScrollService,
    config?: NgxRepositionScrollStrategyConfig
  ) {
    this._config = { ...(new NgxRepositionScrollStrategyConfig()), ...config };
  }


  attach (overlayRef: NgxOverlayRef): void {
    if (this._overlayRef) {
      throw new Error('Scroll strategy has already been attached.');
    }

    this._overlayRef = overlayRef;
  }

  enable (): void {
    if (!this._subscription) {
      this._subscription = this._scrollService.subscribe(() => {
        this._overlayRef.updatePosition();
      },
      this._config.scrollThrottle);
    }
  }

  disable (): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = null;
    }
  }
}


export {
  NgxRepositionScrollStrategyConfig,
  NgxRepositionScrollStrategy,
};

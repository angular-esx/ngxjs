import { Subscription } from 'rxjs/Subscription';

import { INgxScrollService } from '../../../services';
import { INgxOverlayRef } from '../../overlay';
import { INgxRepositionScrollStrategy } from './reposition-scroll-strategy.interface';


export class NgxRepositionScrollStrategyConfig {
  scrollThrottle?: number = 0;
}

/**
 * Strategy that will update the element position as the user is scrolling.
 */
export class NgxRepositionScrollStrategy implements INgxRepositionScrollStrategy {
  protected _config: NgxRepositionScrollStrategyConfig;
  protected _overlayRef: INgxOverlayRef;

  protected _subscription: Subscription;


  constructor (
    protected _scrollService: INgxScrollService,
    config?: NgxRepositionScrollStrategyConfig
  ) {
    this._config = { ...(new NgxRepositionScrollStrategyConfig()), ...config };
  }


  attach (overlayRef: INgxOverlayRef): this {
    this._overlayRef = overlayRef;

    return this;
  }

  enable (): void {
    if (!this._subscription) {
      this._subscription = this._scrollService.subscribe(() => {
          this._overlayRef.config.positionStrategy.apply();
        },
        this._config.scrollThrottle
      );
    }
  }

  disable (): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = null;
    }
  }
}

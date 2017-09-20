import { Subscription } from 'rxjs/Subscription';

import { NgxScrollService } from '../../services';
import { NgxOverlayRef } from '../overlay';
import { INgxScrollStrategy } from './scroll-strategy.interface';


/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
class NgxCloseScrollStrategy implements INgxScrollStrategy {
  protected _overlayRef: NgxOverlayRef;

  protected _subscription: Subscription;


  constructor (protected _scrollService: NgxScrollService) {}


  attach (overlayRef: NgxOverlayRef): this {
    this._overlayRef = overlayRef;

    return this;
  }

  enable (): void {
    if (!this._subscription) {
      this._subscription = this._scrollService.subscribe(() => {
        if (this._overlayRef.hasAttached) {
          this._overlayRef.detach();
        }

        this.disable();
      }, 0);
    }
  }

  disable (): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = null;
    }
  }
}


export { NgxCloseScrollStrategy };

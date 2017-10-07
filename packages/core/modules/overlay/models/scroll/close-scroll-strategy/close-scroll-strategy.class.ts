import { Subscription } from 'rxjs/Subscription';

import { INgxScrollService } from '../../../services';
import { INgxOverlayRef } from '../../overlay';
import { INgxCloseScrollStrategy } from './close-scroll-strategy.interface';


/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
export class NgxCloseScrollStrategy implements INgxCloseScrollStrategy {
  protected _overlayRef: INgxOverlayRef;

  protected _subscription: Subscription;


  constructor (protected _scrollService: INgxScrollService) {}


  attach (overlayRef: INgxOverlayRef): this {
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

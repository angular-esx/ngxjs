import { INgxScrollStrategy } from './scroll-strategy.interface';
import { NgxOverlayRef } from '../overlay';

/**
 * Scroll strategy that doesn't do anything.
 */
class NgxNoopScrollStrategy implements INgxScrollStrategy {
  enable (): void { return; }
  disable (): void { return; }
  attach (overlayRef: NgxOverlayRef): this { return this; }
}


export { NgxNoopScrollStrategy };

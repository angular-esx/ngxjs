import { INgxOverlayRef } from '../../overlay';
import { INgxNoopScrollStrategy } from './noop-scroll-strategy.interface';

/**
 * Scroll strategy that doesn't do anything.
 */
class NgxNoopScrollStrategy implements INgxNoopScrollStrategy {
  enable (): void { return; }
  disable (): void { return; }
  attach (overlayRef: INgxOverlayRef): this { return this; }
}


export { NgxNoopScrollStrategy };

import { INgxScrollStrategy } from './scroll-strategy.interface';

/**
 * Scroll strategy that doesn't do anything.
 */
class NgxNoopScrollStrategy implements INgxScrollStrategy {
  enable (): void { return; }
  disable (): void { return; }
  attach (): void { return; }
}


export { NgxNoopScrollStrategy };

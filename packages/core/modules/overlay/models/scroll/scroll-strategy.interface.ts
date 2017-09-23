import { INgxOverlayRef } from '../overlay';


/**
 * Describes a strategy that will be used by an overlay
 * to handle scroll events while it is open.
 */
interface INgxScrollStrategy {
  enable: () => void;
  disable: () => void;
  attach: (overlayRef: INgxOverlayRef) => this;
}


export { INgxScrollStrategy };


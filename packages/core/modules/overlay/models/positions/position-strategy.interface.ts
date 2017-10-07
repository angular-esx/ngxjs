import { INgxOverlayRef } from '../overlay';
/**
 * Strategy for setting the position on an overlay.
 */
export interface INgxPositionStrategy {
  /**
   * Attach overlayRef to the position strategy
   */
  attach: (overlayRef: INgxOverlayRef) => this;
  /**
   * Updates the position of the overlay element.
   */
  apply (): void;
  /**
   * Cleans up any DOM modifications made by the position strategy, if necessary.
   */
  dispose (): void;
}

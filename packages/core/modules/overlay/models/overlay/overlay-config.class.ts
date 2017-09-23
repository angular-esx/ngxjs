import { INgxOverlayContainer } from '../container';
import { INgxPositionStrategy } from '../positions';
import { INgxScrollStrategy } from '../scroll';


/**
 * A bag of values for either the initial configuration of an overlay.
 */
export class NgxOverlayConfig {
  /**
   * Container for overlay
   */
  container?: INgxOverlayContainer;
  /**
   * Strategy with which to position the overlay
   */
  positionStrategy?: INgxPositionStrategy;
  /**
   * Strategy to be used when handling scroll events while the overlay is open
   */
  scrollStrategy?: INgxScrollStrategy;

  hasBackdrop?: boolean = false;
  /**
    * Custom classes to add to the overlay panel.
    */
  overlayClasses?: Array<string>;
  /**
   * Custom class to add to the backdrop
   */
  backdropClass?: string;
  /**
   * The width of the overlay panel. If a number is provided, pixel units are assumed.
   */
  width?: number | string;
  /**
   * The height of the overlay panel. If a number is provided, pixel units are assumed.
   */
  height?: number | string;
  /**
   * The min-width of the overlay panel. If a number is provided, pixel units are assumed.
   */
  minWidth?: number | string;
  /**
   * The min-height of the overlay panel. If a number is provided, pixel units are assumed.
   */
  minHeight?: number | string;
  /**
   * The max-width of the overlay panel. If a number is provided, pixel units are assumed.
   */
  maxWidth?: number | string;
  /**
   * The max-height of the overlay panel. If a number is provided, pixel units are assumed.
   */
  maxHeight?: number | string;
  /**
   * The direction of the text in the overlay panel.
   */
  direction?: 'ltr' | 'rtl' = 'ltr';
  /**
   * A callback is executed when the backdrop is clicked
   */
  onBackdropClick?: () => void;
  /**
   * A callback is executed when the overlay has been attached
   */
  onAttach?: () => void;
  /**
   * A callback is executed when the overlay has been detached
   */
  onDetach?: () => void;
}

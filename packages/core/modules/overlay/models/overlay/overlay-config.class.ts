import { INgxPositionStrategy } from '../positions';
import {
  INgxScrollStrategy,
  NgxNoopScrollStrategy,
} from '../scroll';
import { NGX_OVERLAY } from './overlay.enum';


/**
 * A bag of values for either the initial configuration of an overlay.
 */
class NgxOverlayConfig {
  /**
   * Strategy with which to position the overlay
   */
  positionStrategy?: INgxPositionStrategy;
  /**
   * Strategy to be used when handling scroll events while the overlay is open
   */
  scrollStrategy?: INgxScrollStrategy = new NgxNoopScrollStrategy();

  hasBackdrop?: boolean = false;
  /**
    * Custom class to add to the overlay panel.
    */
  overlayPanelClass?: string = '';
  /**
   * Custom class to add to the backdrop
   */
  backdropClass?: string = NGX_OVERLAY.BACKDROP_VARIANT_DARK_CLASS;
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


export { NgxOverlayConfig };

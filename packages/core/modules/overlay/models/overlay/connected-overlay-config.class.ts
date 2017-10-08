import { NgxOriginOverlayDirective } from '../../origin-overlay.directive';
import {
  INgxPositionStrategy,
  NgxConnectionPositionPairType,
  NgxChangedConnectedOverlayPositionEventType,
} from '../positions';
import { NgxOverlayConfig } from './overlay-config.class';


export class NgxConnectedOverlayConfig extends NgxOverlayConfig {
  /**
   * Whether the overlay is open.
   */
  isActive?: boolean = false;
  /**
   * The offset in pixels for the overlay connection point on the x-axis
   */
  offsetX?: number;
  /**
   * The offset in pixels for the overlay connection point on the y-axis
   */
  offsetY?: number;
  /**
   * Origin for the connected overlay.
   */
  originOverlay: NgxOriginOverlayDirective;
  /**
   * Registered connected position pairs.
   */
  connectedPositions?: Array<NgxConnectionPositionPairType>;
  /**
   * A callback is executed when the position has changed.
   */
  onPositionChange?: (event: NgxChangedConnectedOverlayPositionEventType) => void;
}

import { NgxScrollableViewType } from '../scroll';


/**
 * A simple (x, y) coordinate.
 */
type NgxPointType = {
  x: number;
  y: number;
};
/**
 * Expands the simple (x, y) coordinate by adding info about whether the
 * element would fit inside the viewport at that position, as well as
 * how much of the element would be visible.
 */
type NgxOverlayPointType = NgxPointType & {
  visibleArea: number;
  fitsInViewport: boolean;
};
/**
 * Container to hold the bounding positions of a particular element with respect to the viewport,
 * where top and bottom are the y-axis coordinates of the bounding rectangle and left and right are
 * the x-axis coordinates.
 */
type NgxElementBoundingPositionsType = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};
/**
 * Horizontal dimension of a connection point on the perimeter of the origin or overlay element.
 */
type NgxHorizontalConnectionPositionType = 'start' | 'center' | 'end';
/**
 * Vertical dimension of a connection point on the perimeter of the origin or overlay element.
 */
type NgxVerticalConnectionPositionType = 'top' | 'center' | 'bottom';
/**
 * A connection point on the overlay or origin element.
 */
type NgxConnectionPositionType = {
  x: NgxHorizontalConnectionPositionType;
  y: NgxVerticalConnectionPositionType;
};
/**
 * The points of the origin element and the overlay element to connect.
 */
type NgxConnectionPositionPairType = {
  origin: NgxConnectionPositionType;
  overlay: NgxConnectionPositionType;
};
/**
 * The change event emitted by the strategy when a fallback position is used.
 */
type NgxConnectedOverlayPositionChangedType = {
  connectionPair: NgxConnectionPositionPairType;
  scrollableView: NgxScrollableViewType;
};


export {
  NgxPointType,
  NgxOverlayPointType,
  NgxElementBoundingPositionsType,
  NgxHorizontalConnectionPositionType,
  NgxVerticalConnectionPositionType,
  NgxConnectionPositionType,
  NgxConnectionPositionPairType,
  NgxConnectedOverlayPositionChangedType,
};

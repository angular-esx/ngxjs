import { ElementRef } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

import { parseNumber } from 'ngx-infrastructure';

import { NgxBrowserPlatformService } from '../../../../services';
import { NgxViewportService } from '../../services';
import { NgxOverlayRef } from '../overlay';
import {
  NgxPointType,
  NgxOverlayPointType,
  NgxElementBoundingPositionsType,
  NgxConnectionPositionType,
  NgxConnectionPositionPairType,
  NgxConnectedOverlayPositionChangedType,
  INgxPositionStrategy,
} from '../positions';
import {
  NgxScrollableViewType,
  INgxScrollable,
} from '../scroll';


/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element.
 * The relative position is defined in terms of a point on the origin element that is connected to a point on the overlay element.
 * For example, a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner of the overlay.
 */
class NgxConnectedPositionStrategy implements INgxPositionStrategy {
  protected _overlayRef: NgxOverlayRef;

  protected _direction: 'ltr' | 'rtl' = 'ltr';
  /**
   * The origin element against which the overlay will be positioned.
   */
  protected _origin: HTMLElement;
  protected _nativeElement: HTMLElement;
  /**
   * The offset in pixels for the overlay connection point on the x-axis
   */
  protected _overlayX = 0;
  /**
   * The offset in pixels for the overlay connection point on the y-axis
   */
  protected _overlayY = 0;
  /**
   * The Scrollable containers used to check scrollable view properties on position change.
   */
  protected _scrollables: Array<INgxScrollable> = [];
  /**
   * Ordered list of positions, from most to least desirable.
   */
  protected _preferredPositions: Array<NgxConnectionPositionPairType> = [];
  /**
   * The last position to have been calculated as the best fit position.
   */
  protected _lastConnectedPosition: NgxConnectionPositionPairType;
  /*
    Emits an event when the connection point changes.
  */
  protected _positionChangeSubject = new Subject<NgxConnectedOverlayPositionChangedType>();


  readonly positionChange$ = this._positionChangeSubject.asObservable().share();


  constructor (
    originElement: HTMLElement,
    originPosition: NgxConnectionPositionType,
    overlayPosition: NgxConnectionPositionType,
    protected _viewportService: NgxViewportService,
    protected _browserPlatformService: NgxBrowserPlatformService,
  ) {
    this._origin = originElement;

    this.addFallbackPositions({
      origin: originPosition,
      overlay: overlayPosition,
    } as NgxConnectionPositionPairType);
  }


  attach (overlayRef: NgxOverlayRef): this {
    this._overlayRef = overlayRef;

    return this;
  }
  /**
   * Updates the position of the overlay element, using whichever position relative to the origin fits on-screen.
   */
  apply (): void {
    if (!this._overlayRef) {
      throw new Error('You must attack NgxOverlayRef to NgxGlobalPositionStrategy before calling apply().');
    }

    if (!this._browserPlatformService.isBrowser) { return; }

    const _overlay = this._overlayRef.overlayElement;

    if (!this._nativeElement) {
      this._nativeElement = this._browserPlatformService.document.createElement('div');
      this._nativeElement.classList.add('ngx-OverlayPositionStrategy', 'ngx-OverlayPositionStrategy_type_connected');
    }
    if (_overlay.parentNode !== this._nativeElement) {
      _overlay.parentNode.insertBefore(this._nativeElement, _overlay);
      this._nativeElement.appendChild(_overlay);
    }
    /**
     * We need the bounding rects for the origin and the overlay to determine how to position the overlay relative to the origin.
     */
    const _originRect = this._origin.getBoundingClientRect();
    const _overlayRect = _overlay.getBoundingClientRect();
    /**
     * We use the viewport rect to determine whether a position would go off-screen.
     */
    const _viewportRect = this._viewportService.getViewportRect();
    /**
     * Fallback point if none of the fallbacks fit into the viewport.
     */
    let _fallbackPoint: NgxOverlayPointType;
    let _fallbackPosition: NgxConnectionPositionPairType;
    /**
     * We want to place the overlay in the first of the positions such that the overlay fits on-screen.
     */
    for (const _position of this._preferredPositions) {
      /**
       * Get the (x, y) point of connection on the origin, and then use that to get the
       * (top, left) coordinate for the overlay at _position.
       */
      const _originPoint = this._getOriginPoint(_originRect, _position);
      const _overlayPoint = this._getOverlayPoint(_originPoint, _overlayRect, _viewportRect, _position);
      /**
       * If the overlay in the calculated position fits on-screen, put it there and we're done.
       */
      if (_overlayPoint.fitsInViewport) {
        this._setOverlayPosition(_overlay, _overlayRect, _overlayPoint, _position);
        /**
         * Save the last connected position in case the position needs to be re-calculated.
         */
        this._lastConnectedPosition = _position;

        return;
      }
      else if (!_fallbackPoint || _fallbackPoint.visibleArea < _overlayPoint.visibleArea) {
        _fallbackPoint = _overlayPoint;
        _fallbackPosition = _position;
      }
    }
    /**
     * If none of the positions were in the viewport, take the one with the largest visible area.
     */
    this._setOverlayPosition(_overlay, _overlayRect, _fallbackPoint, _fallbackPosition);
  }

  dispose (): void {
    if (!this._browserPlatformService.isBrowser) { return; }

    if (this._nativeElement) {
      this._nativeElement.parentNode.removeChild(this._nativeElement);
      this._nativeElement = null;
    }
  }
  /**
   * This re-aligns the overlay element with the trigger in its last calculated position,
   * even if a position higher in the "preferred positions" list would now fit.
   * This allows one to re-align the panel without changing the orientation of the panel.
   */
  recalculateLastPosition (): void {
    if (!this._browserPlatformService.isBrowser) { return; }

    const _originRect = this._origin.getBoundingClientRect();
    const _overlayRect = this._overlayRef.overlayElement.getBoundingClientRect();
    const _viewportRect = this._viewportService.getViewportRect();
    const _lastPosition = this._lastConnectedPosition || this._preferredPositions[0];

    const _originPoint = this._getOriginPoint(_originRect, _lastPosition);
    const _overlayPoint = this._getOverlayPoint(_originPoint, _overlayRect, _viewportRect, _lastPosition);

    this._setOverlayPosition(this._overlayRef.overlayElement, _overlayRect, _overlayPoint, _lastPosition);
  }
  /**
   * Sets the list of INgxScrollables that host the origin element so that
   * on reposition we can evaluate if it or the overlay has been clipped or outside view.
   * Every INgxScrollables must be an ancestor element of the strategy's origin element.
   */
  addScrollables (...scrollables: Array<INgxScrollable>): this {
    if (scrollables && scrollables.length > 0) { this._scrollables.push(...scrollables); }

    return this;
  }
  clearScrollables (): this {
    this._scrollables = [];

    return this;
  }

  addFallbackPositions (...positions: Array<NgxConnectionPositionPairType>): this {
    if (positions && positions.length > 0) { this._preferredPositions.push(...positions); }

    return this;
  }
  clearFallbackPositions (): this {
    this._preferredPositions = [];

    return this;
  }
  /**
   * Sets the layout direction so the overlay's position can be adjusted to match.
   */
  setDirection (direction: 'ltr' | 'rtl'): this {
    this._direction = direction;

    return this;
  }
  /**
   * Sets an offset for the overlay's connection point on the x-axis
   */
  setOffsetX (value: number): this {
    this._overlayX = parseNumber(value);

    return this;
  }
  /**
   * Sets an offset for the overlay's connection point on the y-axis
   */
  setOffsetY (value: number): this {
    this._overlayY = parseNumber(value);

    return this;
  }


  /**
   * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
   */
  protected _getOriginPoint (originRect: ClientRect, position: NgxConnectionPositionPairType): NgxPointType {
    const _originStartX = this._direction === 'ltr' ? originRect.left : originRect.right;
    const _originEndX = this._direction === 'ltr' ? originRect.right : originRect.left;

    let x: number;
    if (position.origin.x === 'center') {
      x = _originStartX + (originRect.width / 2);
    }
    else {
      x = position.origin.x === 'start' ? _originStartX : _originEndX;
    }

    let y: number;
    if (position.origin.y === 'center') {
      y = originRect.top + (originRect.height / 2);
    }
    else {
      y = position.origin.y === 'top' ? originRect.top : originRect.bottom;
    }

    return { x, y };
  }
  /**
   * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
   * origin point to which the overlay should be connected, as well as how much of the element
   * would be inside the viewport at that position.
   */
  protected _getOverlayPoint (
    originPoint: NgxPointType,
    overlayRect: ClientRect,
    viewportRect: ClientRect,
    position: NgxConnectionPositionPairType
  ): NgxOverlayPointType {
    /**
     * Calculate the (overlayStartX, overlayStartY), the start of the potential overlay position relative to the origin point.
     */
    let _overlayStartX: number;
    if (position.overlay.x === 'center') {
      _overlayStartX = -overlayRect.width / 2;
    }
    else if (position.overlay.x === 'start') {
      _overlayStartX = this._direction === 'rtl' ? -overlayRect.width : 0;
    }
    else {
      _overlayStartX = this._direction === 'rtl' ? 0 : -overlayRect.width;
    }

    let _overlayStartY: number;
    if (position.overlay.y === 'center') {
      _overlayStartY = -overlayRect.height / 2;
    }
    else {
      _overlayStartY = position.overlay.y === 'top' ? 0 : -overlayRect.height;
    }
    /**
     * The (x, y) coordinates of the overlay.
     */
    const x = originPoint.x + _overlayStartX + this._overlayX;
    const y = originPoint.y + _overlayStartY + this._overlayY;
    /**
     * How much the overlay would overflow at this position, on each side.
     */
    const _leftOverflow = 0 - x;
    const _rightOverflow = (x + overlayRect.width) - viewportRect.width;
    const _topOverflow = 0 - y;
    const _bottomOverflow = (y + overlayRect.height) - viewportRect.height;
    /**
     * Visible parts of the element on each axis.
     */
    const _visibleWidth = this._subtractOverflows(overlayRect.width, _leftOverflow, _rightOverflow);
    const _visibleHeight = this._subtractOverflows(overlayRect.height, _topOverflow, _bottomOverflow);
    /**
     * The area of the element that's within the viewport.
     */
    const visibleArea = _visibleWidth * _visibleHeight;
    const fitsInViewport = (overlayRect.width * overlayRect.height) === visibleArea;

    return { x, y, fitsInViewport, visibleArea };
  }
  /**
   * Subtracts the amount that an element is overflowing on an axis from it's length.
   */
  protected _subtractOverflows (length: number, ...overflows: number[]): number {
    return overflows.reduce((currentValue: number, currentOverflow: number) => {
      return currentValue - Math.max(currentOverflow, 0);
    }, length);
  }
  /**
   * Physically positions the overlay element to the given coordinate.
   */
  protected _setOverlayPosition (
    overlay: HTMLElement,
    overlayRect: ClientRect,
    overlayPoint: NgxPointType,
    position: NgxConnectionPositionPairType): void {
    const { document } = this._browserPlatformService;
    /**
     * We want to set either `top` or `bottom` based on whether the overlay wants to appear above
     * or below the origin and the direction in which the element will expand.
     */
    const _verticalStyleProperty = position.overlay.y === 'bottom' ? 'bottom' : 'top';
    /**
     * When using `bottom`, we adjust the y position such that it is the distance
     * from the bottom of the viewport rather than the top.
     */
    const _offsetY = _verticalStyleProperty === 'top'
      ? overlayPoint.y
      : document.documentElement.clientHeight - (overlayPoint.y + overlayRect.height);
    /**
     * We want to set either `left` or `right` based on whether the overlay wants to appear "before"
     * or "after" the origin, which determines the direction in which the element will expand.
     * For the horizontal axis, the meaning of "before" and "after" change based on whether the page is in RTL or LTR.
     */
    let _horizontalStyleProperty: string;
    if (this._direction === 'rtl') {
      _horizontalStyleProperty = position.overlay.x === 'end' ? 'left' : 'right';
    }
    else {
      _horizontalStyleProperty = position.overlay.x === 'end' ? 'right' : 'left';
    }
    /**
     * When we're setting `right`, we adjust the x position such that it is the distance
     * from the right edge of the viewport rather than the left edge.
     */
    const _offsetX = _horizontalStyleProperty === 'left'
      ? overlayPoint.x
      : document.documentElement.clientWidth - (overlayPoint.x + overlayRect.width);
    /**
     * Reset any existing styles. This is necessary in case the preferred position has changed since the last `apply`
     */
    ['top', 'bottom', 'left', 'right'].forEach(item => overlay.style[item] = null);

    overlay.style[_verticalStyleProperty] = `${_offsetY}px`;
    overlay.style[_horizontalStyleProperty] = `${_offsetX}px`;
    /**
     * Notify that the position has been changed along with its change properties.
     */
    this._positionChangeSubject.next({
      connectionPair: position,
      scrollableView: this._getScrollableView(overlay),
    } as NgxConnectedOverlayPositionChangedType);
  }
  /**
   * Gets the view properties of the trigger and overlay, including whether they are clipped
   * or completely outside the view of any of the strategy's scrollables.
   */
  protected _getScrollableView (overlay: HTMLElement): NgxScrollableViewType {
    const _originBounds = this._getElementBounds(this._origin);
    const _overlayBounds = this._getElementBounds(overlay);
    const scrollContainerBounds = this._scrollables.map((scrollable) => {
      return this._getElementBounds(scrollable.nativeElement);
    });

    return {
      isOriginClipped: this._isElementClipped(_originBounds, scrollContainerBounds),
      isOriginOutsideView: this._isElementOutsideView(_originBounds, scrollContainerBounds),
      isOverlayClipped: this._isElementClipped(_overlayBounds, scrollContainerBounds),
      isOverlayOutsideView: this._isElementOutsideView(_overlayBounds, scrollContainerBounds),
    };
  }
  /**
   * Returns the bounding positions of the provided element with respect to the viewport.
   */
  protected _getElementBounds (element: HTMLElement): NgxElementBoundingPositionsType {
    const _boundingClientRect = element.getBoundingClientRect();

    return {
      top: _boundingClientRect.top,
      right: _boundingClientRect.left + _boundingClientRect.width,
      bottom: _boundingClientRect.top + _boundingClientRect.height,
      left: _boundingClientRect.left,
    };
  }
  /**
   * Whether the element is clipped by any of the containers.
   */
  protected _isElementClipped (
    elementBounds: NgxElementBoundingPositionsType,
    containersBounds: Array<NgxElementBoundingPositionsType>
  ): boolean {
    return containersBounds.some((containerBounds: NgxElementBoundingPositionsType) => {
      const clippedAbove = elementBounds.top < containerBounds.top;
      const clippedBelow = elementBounds.bottom > containerBounds.bottom;
      const clippedLeft = elementBounds.left < containerBounds.left;
      const clippedRight = elementBounds.right > containerBounds.right;

      return clippedAbove || clippedBelow || clippedLeft || clippedRight;
    });
  }
  /**
   * Whether the element is completely out of the view of any of the containers.
   */
  protected _isElementOutsideView (
    elementBounds: NgxElementBoundingPositionsType,
    containersBounds: Array<NgxElementBoundingPositionsType>
  ): boolean {
    return containersBounds.some((containerBounds: NgxElementBoundingPositionsType) => {
      const outsideAbove = elementBounds.bottom < containerBounds.top;
      const outsideBelow = elementBounds.top > containerBounds.bottom;
      const outsideLeft = elementBounds.right < containerBounds.left;
      const outsideRight = elementBounds.left > containerBounds.right;

      return outsideAbove || outsideBelow || outsideLeft || outsideRight;
    });
  }
}


export { NgxConnectedPositionStrategy };

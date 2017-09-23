import { INgxBrowserPlatformService } from '../../../../../services';
import { INgxOverlayRef } from '../../overlay';
import { INgxGlobalPositionStrategy } from './global-position-strategy.interface';


/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of transforms,
 * in order to avoid issues with subpixel rendering which can cause the element to become blurry.
 */
export class NgxGlobalPositionStrategy implements INgxGlobalPositionStrategy {
  protected _cssPosition: string = 'static';
  protected _topOffset: string = '';
  protected _bottomOffset: string = '';
  protected _leftOffset: string = '';
  protected _rightOffset: string = '';
  protected _alignItems: string = '';
  protected _justifyContent: string = '';
  protected _width: string = '';
  protected _height: string = '';

  protected _nativeElement: HTMLElement;
  protected _overlayRef: INgxOverlayRef;


  constructor (protected _browserPlatformService: INgxBrowserPlatformService){}


  attach (overlayRef: INgxOverlayRef): this {
    this._overlayRef = overlayRef;

    return this;
  }

  apply (): void {
    if (!this._overlayRef) {
      throw new Error('You must attack NgxOverlayRef to NgxGlobalPositionStrategy before calling apply().');
    }

    if (!this._browserPlatformService.isBrowser ) { return; }

    const _overlay = this._overlayRef.overlayElement;

    if (!this._nativeElement) {
      this._nativeElement = this._browserPlatformService.document.createElement('div');
      this._nativeElement.classList.add('ngx-OverlayPositionStrategy', 'ngx-OverlayPositionStrategy_type_global');
    }
    if (_overlay.parentNode !== this._nativeElement) {
      _overlay.parentNode.insertBefore(this._nativeElement, _overlay);
      this._nativeElement.appendChild(_overlay);
    }

    const _overlayStyle = _overlay.style;
    const _nativeElementStyle = this._nativeElement.style;

    _overlayStyle.position = this._cssPosition;
    _overlayStyle.marginTop = this._topOffset;
    _overlayStyle.marginLeft = this._leftOffset;
    _overlayStyle.marginBottom = this._bottomOffset;
    _overlayStyle.marginRight = this._rightOffset;
    _overlayStyle.width = this._width;
    _overlayStyle.height = this._height;

    _nativeElementStyle.justifyContent = this._justifyContent;
    _nativeElementStyle.alignItems = this._alignItems;
  }

  dispose (): void {
    if (!this._browserPlatformService.isBrowser) { return; }

    if (this._nativeElement) {
      this._nativeElement.parentNode.removeChild(this._nativeElement);
      this._nativeElement = null;
    }
  }
  /**
   * Sets the top position of the overlay. Clears any previously set vertical position.
   */
  setTop (value: string): this {
    this._bottomOffset = '';
    this._topOffset = value;
    this._alignItems = 'flex-start';

    return this;
  }
  /**
   * Sets the left position of the overlay. Clears any previously set horizontal position.
   */
  setLeft (value: string): this {
    this._rightOffset = '';
    this._leftOffset = value;
    this._justifyContent = 'flex-start';

    return this;
  }
  /**
   * Sets the bottom position of the overlay. Clears any previously set vertical position.
   */
  setBottom (value: string): this {
    this._topOffset = '';
    this._bottomOffset = value;
    this._alignItems = 'flex-end';

    return this;
  }
  /**
   * Sets the right position of the overlay. Clears any previously set horizontal position.
   */
  setRight (value: string): this {
    this._leftOffset = '';
    this._rightOffset = value;
    this._justifyContent = 'flex-end';

    return this;
  }
  /**
   * Sets the overlay width and clears any previously set width.
   */
  setWidth (value: string): this {
    this._width = value;
    /**
     * When the width is 100%, we should reset the `left` and the offset,
     * in order to ensure that the element is flush against the viewport edge.
     */
    if (value === '100%') { this.setLeft('0px'); }

    return this;
  }
  /**
   * Sets the overlay height and clears any previously set height.
   */
  setHeight (value: string): this {
    this._height = value;
    /**
     * When the height is 100%, we should reset the `top` and the offset,
     * in order to ensure that the element is flush against the viewport edge.
     */
    if (value === '100%') { this.setTop('0px'); }

    return this;
  }
  /**
   * Centers the overlay horizontally. Clears any previously set horizontal position.
   */
  setHorizontalCenter (): this {
    this._justifyContent = 'center';

    return this;
  }
  /**
   * Centers the overlay verticallyly. Clears any previously set vertically position.
   */
  setVerticalCenter (): this {
    this._alignItems = 'center';

    return this;
  }
}

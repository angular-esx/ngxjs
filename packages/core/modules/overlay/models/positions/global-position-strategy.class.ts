import { NgxBrowserPlatformService } from '../../../../services';
import { NGX_OVERLAY } from '../overlay';
import { INgxPositionStrategy } from './position-strategy.interface';


/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of transforms,
 * in order to avoid issues with subpixel rendering which can cause the element to become blurry.
 */
class NgxGlobalPositionStrategy implements INgxPositionStrategy {
  protected _cssPosition: string = 'static';
  protected _topOffset: string = '';
  protected _bottomOffset: string = '';
  protected _leftOffset: string = '';
  protected _rightOffset: string = '';
  protected _alignItems: string = '';
  protected _justifyContent: string = '';
  protected _width: string = '';
  protected _height: string = '';
  /**
   * A lazily-created container for the overlay element that is used as a flex container.
   */
  protected _overlayContainer: HTMLElement;

  /**
   * Sets the top position of the overlay. Clears any previously set vertical position.
   */
  set top (value: string) {
    this._bottomOffset = '';
    this._topOffset = value;
    this._alignItems = 'flex-start';
  }
  /**
   * Sets the left position of the overlay. Clears any previously set horizontal position.
   */
  set left (value: string) {
    this._rightOffset = '';
    this._leftOffset = value;
    this._justifyContent = 'flex-start';
  }
  /**
   * Sets the bottom position of the overlay. Clears any previously set vertical position.
   */
  set bottom (value: string) {
    this._topOffset = '';
    this._bottomOffset = value;
    this._alignItems = 'flex-end';
  }
  /**
   * Sets the right position of the overlay. Clears any previously set horizontal position.
   */
  set right (value: string) {
    this._leftOffset = '';
    this._rightOffset = value;
    this._justifyContent = 'flex-end';
  }
  /**
   * Sets the overlay width and clears any previously set width.
   */
  set width (value: string) {
    this._width = value;
    /**
     * When the width is 100%, we should reset the `left` and the offset,
     * in order to ensure that the element is flush against the viewport edge.
     */
    if (value === '100%') { this.left = '0px'; }
  }
  /**
   * Sets the overlay height and clears any previously set height.
   */
  set height (value: string){
    this._height = value;
    /**
     * When the height is 100%, we should reset the `top` and the offset,
     * in order to ensure that the element is flush against the viewport edge.
     */
    if (value === '100%') { this.top = '0px'; }
  }
  /**
   * Centers the overlay horizontally or vertically.
   * Clears any previously set horizontal position.
   */
  set center (value: 'horizontal' | 'vertical') {
    if (value === 'horizontal') {
      this._justifyContent = 'center';
    }
    else if (value === 'vertical') {
      this._alignItems = 'center';
    }
  }


  constructor (protected _browserPlatformService: NgxBrowserPlatformService){}


  apply (overlay: HTMLElement): void {
    if (!this._browserPlatformService.isBrowser) { return; }

    if (!this._overlayContainer) {
      this._overlayContainer = this._browserPlatformService.document.createElement('div');
      this._overlayContainer.classList.add(NGX_OVERLAY.CONTAINER_CLASS, NGX_OVERLAY.CONTAINER_TYPE_GLOBAL_CLASS);
      overlay.parentNode.insertBefore(this._overlayContainer, overlay);
      this._overlayContainer.appendChild(overlay);
    }

    const _styles = overlay.style;
    const _parentStyles = (overlay.parentNode as HTMLElement).style;

    _styles.position = this._cssPosition;
    _styles.marginTop = this._topOffset;
    _styles.marginLeft = this._leftOffset;
    _styles.marginBottom = this._bottomOffset;
    _styles.marginRight = this._rightOffset;
    _styles.width = this._width;
    _styles.height = this._height;

    _parentStyles.justifyContent = this._justifyContent;
    _parentStyles.alignItems = this._alignItems;
  }

  dispose (): void {
    if (!this._browserPlatformService.isBrowser) { return; }

    if (this._overlayContainer) {
      this._overlayContainer.parentNode.removeChild(this._overlayContainer);
      this._overlayContainer = null;
    }
  }
}


export { NgxGlobalPositionStrategy };

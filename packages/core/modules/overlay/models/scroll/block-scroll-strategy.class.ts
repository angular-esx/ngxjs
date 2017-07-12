import { NgxBrowserPlatformService } from '../../../../services';
import { NgxViewportService } from '../../services';
import { INgxScrollStrategy } from './scroll-strategy.interface';


/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
class NgxBlockScrollStrategy implements INgxScrollStrategy {
  protected _previousHTMLStyles = { top: '', left: '' };
  protected _previousScrollPosition: { top: number, left: number };
  protected _isEnabled = false;

  protected get _canBeEnabled(): boolean {
    const { documentElement, body } = this._browserPlatformService.document;
    /**
     * Since the scroll strategies can't be singletons, we have to use a global CSS class
     * (`ngx-BlockScrollStrategy`) to make sure that we don't try to disable global scrolling multiple times.
     */
    if (documentElement.classList.contains('ngx-BlockScrollStrategy') || this._isEnabled) {
      return false;
    }

    const viewport = this._viewportService.getViewportRect();

    return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
  }


  constructor (
    protected _viewportService: NgxViewportService,
    protected _browserPlatformService: NgxBrowserPlatformService
  ) { }


  attach (): void { return; }

  enable (): void {
    if (this._browserPlatformService.isBrowser && this._canBeEnabled) {
      const { documentElement } = this._browserPlatformService.document;

      this._previousScrollPosition = this._viewportService.getViewportPosition();

      this._previousHTMLStyles.left = documentElement.style.left || '';
      this._previousHTMLStyles.top = documentElement.style.top || '';

      /**
       * We're using the `html` node, instead of the `body`, because the `body` may
       * have the user agent margin, whereas the `html` is guaranteed not to have one.
       */
      documentElement.style.left = `${-this._previousScrollPosition.left}px`;
      documentElement.style.top = `${-this._previousScrollPosition.top}px`;
      documentElement.classList.add('ngx-BlockScrollStrategy');

      this._isEnabled = true;
    }
  }

  disable (): void {
    if (this._browserPlatformService.isBrowser && this._isEnabled) {
      this._isEnabled = false;

      const { documentElement } = this._browserPlatformService.document;

      documentElement.style.left = this._previousHTMLStyles.left;
      documentElement.style.top = this._previousHTMLStyles.top;
      documentElement.classList.remove('ngx-BlockScrollStrategy');

      this._browserPlatformService.window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
    }
  }
}


export { NgxBlockScrollStrategy };

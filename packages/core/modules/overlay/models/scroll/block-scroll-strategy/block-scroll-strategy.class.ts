import { INgxBrowserPlatformService } from '../../../../../services';
import { INgxOverlayRef } from '../../overlay';
import { INgxViewportService } from '../../../services';
import { INgxBlockScrollStrategy } from './block-scroll-strategy.interface';


/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
export class NgxBlockScrollStrategy implements INgxBlockScrollStrategy {
  protected _previousHTMLStyles = { top: '', left: '' };
  protected _previousScrollPosition: { top: number, left: number };
  protected _isEnabled = false;

  protected get _canBeEnabled(): boolean {
    const { documentElement, body } = this._browserPlatformService.document;
    /**
     * Since the scroll strategies can't be singletons, we have to use a global CSS class
     * (`ngx-OverlayScrollStrategy_type_block`) to make sure that we don't try to disable global scrolling multiple times.
     */
    if (documentElement.classList.contains('ngx-OverlayScrollStrategy_type_block') || this._isEnabled) {
      return false;
    }

    const viewport = this._viewportService.getViewportRect();

    return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
  }


  constructor (
    protected _viewportService: INgxViewportService,
    protected _browserPlatformService: INgxBrowserPlatformService
  ) { }


  attach (overlayRef: INgxOverlayRef): this { return this; }

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
      documentElement.classList.add('ngx-OverlayScrollStrategy_type_block');

      this._isEnabled = true;
    }
  }

  disable (): void {
    if (this._browserPlatformService.isBrowser && this._isEnabled) {
      this._isEnabled = false;

      const { documentElement } = this._browserPlatformService.document;

      documentElement.style.left = this._previousHTMLStyles.left;
      documentElement.style.top = this._previousHTMLStyles.top;
      documentElement.classList.remove('ngx-OverlayScrollStrategy_type_block');

      this._browserPlatformService.window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
    }
  }
}

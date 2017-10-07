import { NgxBrowserPlatformService } from '../../../../services';
import { INgxOverlayContainer } from './overlay-container.interface';


class NgxOverlayContainer implements INgxOverlayContainer {
  protected _nativeElement: HTMLElement;

  get nativeElement(): HTMLElement {
    if (!this._nativeElement) { this._createContainer(); }

    return this._nativeElement;
  }


  constructor (protected _browserPlatformService: NgxBrowserPlatformService) {}


  dispose (): void {
    if (this._nativeElement && this._nativeElement.parentNode) {
      this._nativeElement.parentNode.removeChild(this._nativeElement);
    }
  }
  /**
   * Create the overlay container element on the document body.
   */
  protected _createContainer (): void {
    if (!this._browserPlatformService.isBrowser) { return; }

    const _element = this._browserPlatformService.document.createElement('div');
    _element.classList.add('ngx-OverlayContainer');

    this._nativeElement = _element;

    this._browserPlatformService.document.body.appendChild(_element);
  }
}


export { NgxOverlayContainer };

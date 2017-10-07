import { NgxOverlayContainer } from './overlay-container.class';


/**
 * The FullscreenOverlayContainer is the alternative to OverlayContainer
 * that supports correct displaying of overlay elements in Fullscreen mode
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
 */
class NgxFullscreenOverlayContainer extends NgxOverlayContainer {
  /**
   * When the page is put into fullscreen mode, a specific element is specified.
   * Only that element and its children are visible when in fullscreen mode.
  */
  get fullscreenElement(): Element {
    if (!this._browserPlatformService.isBrowser) { return null; }

    const { document } = this._browserPlatformService;

    return document.fullscreenElement
      || document.webkitFullscreenElement
      || (document as any).mozFullScreenElement
      || (document as any).msFullscreenElement
      || null;
  }

  protected _createContainer (): void {
    if (!this._browserPlatformService.isBrowser) { return; }

    super._createContainer();

    this._adjustParentForFullscreenChange();
    this._addFullscreenChangeListener(() => this._adjustParentForFullscreenChange());
  }

  protected _adjustParentForFullscreenChange (): void {
    (this.fullscreenElement || this._browserPlatformService.document.body).appendChild(this._nativeElement);
  }

  protected _addFullscreenChangeListener (func: () => void): void {
    const { document } = this._browserPlatformService;

    if (document.fullscreenEnabled) {
      document.addEventListener('fullscreenchange', func);
    }
    else if (document.webkitFullscreenEnabled) {
      document.addEventListener('webkitfullscreenchange', func);
    }
    else if ((document as any).mozFullScreenEnabled) {
      document.addEventListener('mozfullscreenchange', func);
    }
    else if ((document as any).msFullscreenEnabled) {
      document.addEventListener('MSFullscreenChange', func);
    }
  }
}


export { NgxFullscreenOverlayContainer };

import {
  Injectable,
  Optional,
  SkipSelf,
  Inject,
} from '@angular/core';

import { NgxBrowserPlatformService } from '../../../services';
import { NgxScrollService } from './scroll.service';


/**
 * Simple utility for getting the bounds of the browser viewport.
 */
@Injectable()
class NgxViewportService {
  protected _clientRect: ClientRect;


  constructor (
    @Inject(NgxScrollService) protected _scrollService: NgxScrollService,
    @Inject(NgxBrowserPlatformService) protected _browserPlatformService: NgxBrowserPlatformService
  ) {
    this._scrollService.subscribe(() => this._cacheViewportGeometry(), 0);
  }

  /**
   * Gets a ClientRect for the viewport's bounds.
   */
  getViewportRect (clientRect?: ClientRect): ClientRect {
    if (!this._browserPlatformService.isBrowser) { return null; }

    let _rect = clientRect || this._clientRect;

    if (!_rect) {
      this._cacheViewportGeometry();
      _rect = this._clientRect;
    }

    const _scrollPosition = this.getViewportPosition(_rect);
    const height = this._browserPlatformService.window.innerHeight;
    const width = this._browserPlatformService.window.innerWidth;

    return {
      top: _scrollPosition.top,
      left: _scrollPosition.left,
      bottom: _scrollPosition.top + height,
      right: _scrollPosition.left + width,
      height,
      width,
    };
  }
  /**
   * Gets the (top, left) scroll position of the viewport.
   */
  getViewportPosition (clientRect?: ClientRect): { top: number, left: number } {
    if (!this._browserPlatformService.isBrowser) { return null; }

    let _rect = clientRect || this._clientRect;

    if (!_rect) {
      this._cacheViewportGeometry();
      _rect = this._clientRect;
    }

    const { document, window } = this._browserPlatformService;
    /*
      The top-left-corner of the viewport is determined by the scroll position of the document
      body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
      whether `document.body` or `document.documentElement` is the scrolled element, so reading
      `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
      `document.documentElement` works consistently, where the `top` and `left` values will
      equal negative the scroll position.
    */
    return {
      top: -_rect!.top || document.body.scrollTop || window.scrollY || document.documentElement.scrollTop || 0,
      left: -_rect!.left || document.body.scrollLeft || window.scrollX || document.documentElement.scrollLeft || 0,
    };
  }

  protected _cacheViewportGeometry (): void {
    /**
     * Use the document element's bounding rect rather than the window scroll properties
     * (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
     * properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
     * conceptual viewports. Under most circumstances these viewports are equivalent, but they
     * can disagree when the page is pinch-zoomed (on devices that support touch).
     * See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
     * We use the documentElement instead of the body because, by default (without a css reset)
     * browsers typically give the document body an 8px margin, which is not included in getBoundingClientRect().
     */
    this._clientRect = this._browserPlatformService.document.documentElement.getBoundingClientRect();
  }
}

function ngxViewportFactory (parentViewportService: NgxViewportService, scrollService: NgxScrollService, browserPlatformService: NgxBrowserPlatformService) {
  return parentViewportService || new NgxViewportService(scrollService, browserPlatformService);
}


export {
  NgxViewportService,
  ngxViewportFactory,
};
/**
 * If there is already a NgxViewportService available, use that. Otherwise, provide a new one.
 */
export const ngxViewportProvider = {
  provide: NgxViewportService,
  deps: [[new Optional(), new SkipSelf(), NgxViewportService], NgxScrollService, NgxBrowserPlatformService],
  useFactory: ngxViewportFactory,
};

import {
  PLATFORM_ID,
  Injectable,
  Inject,
  Optional,
  SkipSelf,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';

import { INgxBrowserPlatformService } from './browser-platform-service.interface';

/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 */
@Injectable()
export class NgxBrowserPlatformService implements INgxBrowserPlatformService {
  /**
   * Whether the current platform supports the V8 Break Iterator.
   * The V8 check is necessary to detect all Blink based browsers.
   */
  protected readonly _hasV8BreakIterator: boolean = (typeof(Intl) !== 'undefined' && (Intl as any).v8BreakIterator);

  readonly isBrowser = isPlatformBrowser(this._platformId);

  readonly isEdge = this.isBrowser && /(edge)/i.test(navigator.userAgent);

  readonly isTrident = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
  /**
   * EdgeHTML and Trident mock Blink specific things and need to be excluded from this check.
   */
  readonly isBlink = this.isBrowser && (!!(this.window.chrome || this._hasV8BreakIterator) && !!CSS && !this.isEdge && !this.isTrident);
  /**
   * Webkit is part of the userAgent in EdgeHTML, Blink and Trident.
   * Therefore we need to ensure that Webkit runs standalone and is not used as another engine's base.
   */
  readonly isWebkit = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.isBlink && !this.isEdge && !this.isTrident;
  /**
   * It's difficult to detect the plain Gecko engine, because most of the browsers identify
   * them self as Gecko-like browsers and modify the userAgent's according to that.
   * Since we only cover one explicit Firefox case, we can simply check for Firefox
   * instead of having an unstable check for Gecko.
   */
  readonly isFirefox = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
  /**
   * Safari browsers will include the Safari keyword in their userAgent. Some browsers may fake
   * this and just place the Safari keyword in the userAgent. To be more safe about Safari every
   * Safari browser should also use Webkit as its layout engine.
   */
  readonly isSafari = this.isBrowser && /safari/i.test(navigator.userAgent) && this.isWebkit;
  /**
   * Trident on mobile adds the android platform to the userAgent to trick detections.
   */
  readonly isAndroid = this.isBrowser && /android/i.test(navigator.userAgent) && !this.isTrident;

  readonly isIOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !this.window.MSStream;

  get window(): any {
    return this.isBrowser ? window : null;
  }


  constructor (
    @Inject(PLATFORM_ID) private _platformId: any,
    @Inject(DOCUMENT) public readonly document: any
  ) {}
}

export function ngxBrowserPlatformServiceFactory (
  parentBrowserPlatformService: INgxBrowserPlatformService,
  platformId: any,
  document: any
) {
  return parentBrowserPlatformService || new NgxBrowserPlatformService(platformId, document);
}
/**
 * If there is already a NgxBrowserPlatformService available, use that. Otherwise, provide a new one.
 */
export const ngxBrowserPlatformServiceProvider = {  
  provide: NgxBrowserPlatformService,
  deps: [
    [new Optional(), new SkipSelf(), NgxBrowserPlatformService],
    [new Inject(PLATFORM_ID)],
    [new Inject(DOCUMENT)],
  ],
  useFactory: ngxBrowserPlatformServiceFactory,
};

import {
  ComponentRef,
  NgZone,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/share';

import { NgxBrowserPlatformService } from '../../../../services';
import {
  INgxPortal,
  INgxPortalHost,
  INgxTemplatePortal,
  INgxComponentPortal,
} from '../../../portal';
import { NGX_OVERLAY } from '../overlay';
import { NgxOverlayConfig } from './overlay-config.class';


/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
class NgxOverlayRef implements INgxPortalHost {
  protected _config: NgxOverlayConfig;
  protected _backdropElement: HTMLElement;
  protected _disposeFunc: () => void;

  protected _backdropClickSubject = new Subject<any>();
  protected _attachSubject = new Subject<void>();
  protected _detachSubject = new Subject<void>();


  readonly backdropClick$ = this._backdropClickSubject.asObservable().share();
  readonly attach$ = this._attachSubject.asObservable().share();
  readonly detach$ = this._detachSubject.asObservable().share();

  /**
   * Checks whether the overlay has been attached.
   */
  get hasAttached(): boolean {
    return this._portalHost.hasAttached;
  }

  get overlayElement(): HTMLElement {
    return this._overlay;
  }

  get config(): NgxOverlayConfig {
    return this._config;
  }

  constructor (
    protected _portalHost: INgxPortalHost,
    protected _overlay: HTMLElement,
    config: NgxOverlayConfig,
    protected _ngZone: NgZone,
    protected _browserPlatformService: NgxBrowserPlatformService
  ) {
    if (!this._overlay || !this._overlay.parentNode) {
      throw new Error(`Invalid overlay. Overlay must have 'parentNode'.`);
    }
    if (!config || !config.positionStrategy || !config.scrollStrategy) {
      throw new Error(`Invalid config. NgxOverlayConfig must have instances of INgxPositionStrategy and INgxScrollStrategy.`);
    }

    this._config = { ...(new NgxOverlayConfig()), ...config };
    this._config.scrollStrategy.attach(this);
  }

  setDisposeFunc (func: () => void) {
    this._disposeFunc = func;
  }

  attachTemplate (portal: INgxTemplatePortal): Map<string, any> {
    if (!this._browserPlatformService.isBrowser) { return null; }

    const attachResult = this._portalHost.attachTemplate(portal);

    this._attachOverlay();

    return attachResult;
  }

  attachComponent<T> (portal: INgxComponentPortal<T>): ComponentRef<T> {
    if (!this._browserPlatformService.isBrowser) { return null; }

    const attachResult = this._portalHost.attachComponent(portal);

    this._attachOverlay();

    return attachResult;
  }

  detach (): void {
    if (!this._browserPlatformService.isBrowser) { return null; }

    this._detachBackdrop();

    /**
     * When the overlay is detached, the pane element should disable pointer events.
     * This is necessary because otherwise the pane element will cover the page and disable
     * pointer events therefore. Depends on the position strategy and the applied pane boundaries.
     */
    this._togglePointerEvents(false);
    this._config.scrollStrategy.disable();

    const detachResult = this._portalHost.detach();
    /**
     * Only emit after everything is detached.
     */
    this._detachSubject.next();
  }

  dispose (): void {
    this._config.positionStrategy.dispose();
    this._config.scrollStrategy.disable();
    this._detachBackdrop();
    this._portalHost.dispose();
    this._backdropClickSubject.complete();
    this._attachSubject.complete();
    this._detachSubject.next();
    this._detachSubject.complete();
  }
  /**
   * Updates the position of the overlay based on the position strategy.
   */
  updatePosition (): void {
    if (!this._browserPlatformService.isBrowser) { return null; }

    this._config.positionStrategy.apply(this._overlay);
  }

  protected _attachOverlay (): void {
    this._updateStackingOrder();
    this._updateDirection();
    this._updateSize();
    this._updatePosition();
    this._config.scrollStrategy.enable();
    this._togglePointerEvents(true);

    if (this._config.hasBackdrop) {
      this._attachBackdrop();
    }

    if (this._config.overlayPanelClass) {
      this._overlay.classList.add(this._config.overlayPanelClass);
    }
    /**
     * Only emit the `attachments` event once all other setup is done.
     */
    this._attachSubject.next();
  }

  protected _attachBackdrop (): void {
    this._backdropElement = document.createElement('div');
    this._backdropElement.classList.add(NGX_OVERLAY.BACKDROP_CLASS);
    this._backdropElement.classList.add(this._config.backdropClass);

    if (this._config.backdropClass) {
      this._backdropElement.classList.add(this._config.backdropClass);
    }
    /**
     * Insert the backdrop before the pane in the DOM order,
     * in order to handle stacked overlays properly.
     */
    this._overlay.parentElement.insertBefore(this._backdropElement, this._overlay);
    /**
     * Forward backdrop clicks such that the consumer of the overlay can perform whatever
     * action desired when such a click occurs (usually closing the overlay).
     */
    this._backdropElement.addEventListener('click', () => this._backdropClickSubject.next());
    /**
     * Add class to fade-in the backdrop after one frame.
     */
    requestAnimationFrame(() => {
      if (this._backdropElement) {
        this._backdropElement.classList.add(NGX_OVERLAY.BACKDROP_STATE_ACTIVE_CLASS);
      }
    });
  }

  protected _detachBackdrop (): void {
    const _backdropToDetach = this._backdropElement;

    if (_backdropToDetach) {
      const _finishDetachFunc = () => {
        /**
         * It may not be attached to anything in certain cases (e.g. unit tests).
         */
        if (_backdropToDetach && _backdropToDetach.parentNode) {
          _backdropToDetach.parentNode.removeChild(_backdropToDetach);
        }
        /**
         * It is possible that a new portal has been attached to this overlay since we started
         * removing the backdrop. If that is the case, only clear the backdrop reference if it
         * is still the same instance that we started to remove.
         */
        if (this._backdropElement === _backdropToDetach) {
          this._backdropElement = null;
        }
      };

      _backdropToDetach.classList.remove(NGX_OVERLAY.BACKDROP_STATE_ACTIVE_CLASS);
      _backdropToDetach.classList.remove(this._config.backdropClass);
      _backdropToDetach.addEventListener('transitionend', _finishDetachFunc);
      /**
       * If the backdrop doesn't have a transition, the `transitionend` event won't fire.
       * In this case we make it unclickable and we try to remove it after a delay.
       */
      _backdropToDetach.style.pointerEvents = 'none';
      /**
       * Run this outside the Angular zone because there's nothing that Angular cares about.
       * If it were to run inside the Angular zone, every test that used Overlay would have to be
       * either async or fakeAsync.
       */
      this._ngZone.runOutsideAngular(() => {
        setTimeout(_finishDetachFunc, 500);
      });
    }
  }
  /**
   * Updates the stacking order of the element, moving it to the top if necessary.
   * This is required in cases where one overlay was detached, while another one,
   * that should be behind it, was destroyed. The next time both of them are opened,
   * the stacking will be wrong, because the detached element's pane will still be
   * in its original DOM position.
   */
  protected _updateStackingOrder () {
    if (this._overlay.nextSibling && this._overlay.parentNode) {
      this._overlay.parentNode.appendChild(this._overlay);
    }
  }
  /**
   * Toggles the pointer events for the overlay pane element.
   */
  protected _togglePointerEvents (enablePointer: boolean) {
    this._overlay.style.pointerEvents = enablePointer ? 'auto' : 'none';
  }
  /**
   * Updates the text direction of the overlay panel.
   */
  protected _updateDirection () {
    this._overlay.setAttribute('dir', this._config.direction);
  }
  /**
   * Updates the size of the overlay based on the overlay config.
   */
  protected _updateSize (): void {
    if (this._config.width || this._config.width === 0) {
      this._overlay.style.width = this._formatCssUnit(this._config.width);
    }

    if (this._config.height || this._config.height === 0) {
      this._overlay.style.height = this._formatCssUnit(this._config.height);
    }

    if (this._config.minWidth || this._config.minWidth === 0) {
      this._overlay.style.minWidth = this._formatCssUnit(this._config.minWidth);
    }

    if (this._config.minHeight || this._config.minHeight === 0) {
      this._overlay.style.minHeight = this._formatCssUnit(this._config.minHeight);
    }
  }
  /**
   * Updates the position of the overlay based on the position strategy.
   */
  protected _updatePosition (): void {
    this._config.positionStrategy.apply(this._overlay);
  }

  protected _formatCssUnit (value: number | string, defaultUnit: string = 'px'): string {
    return typeof value === 'string' ? value as string : `${value}${defaultUnit}`;
  }
}


export { NgxOverlayRef };

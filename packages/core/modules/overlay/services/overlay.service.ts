
import {
  ComponentFactoryResolver,
  Injectable,
  ApplicationRef,
  ViewContainerRef,
  Injector,
  Inject,
  NgZone,
} from '@angular/core';

import { NgxBrowserPlatformService } from '../../../services';
import { NgxDomPortalHost } from '../../portal';
import {
  NgxOverlayConfig,
  NgxOverlayRef,
} from '../models';
import { ngxViewportProvider } from './viewport.service';
import { ngxScrollProvider } from './scroll.service';


/**
 * Next overlay unique ID.
 */
let _nextUniqueId = 1;
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
@Injectable()
class NgxOverlayService {
  constructor (
    @Inject(ApplicationRef) protected _appRef: ApplicationRef,
    @Inject(ComponentFactoryResolver) protected _componentFactoryResolver: ComponentFactoryResolver,
    @Inject(Injector) protected _injector: Injector,
    @Inject(NgZone) protected _ngZone: NgZone,
    @Inject(NgxBrowserPlatformService) protected _browserPlatformService: NgxBrowserPlatformService
  ) {}

  create (config: NgxOverlayConfig): NgxOverlayRef {
    if (!this._browserPlatformService.isBrowser) { return null; }

    if (!config || !config.container) {
      throw new Error(`Invalid config. NgxOverlayConfig must have instances of INgxOverlayContainer.`);
    }

    const _overlay = this._createOverlayElement(config);

    return new NgxOverlayRef(
      new NgxDomPortalHost(_overlay, this._componentFactoryResolver, this._appRef, this._injector),
      _overlay,
      config,
      this._ngZone,
      this._browserPlatformService
    );
  }

  protected _createOverlayElement (config: NgxOverlayConfig): HTMLElement {
    const { document } = this._browserPlatformService;
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     */
    const overlay = document.createElement('div');
    overlay.id = `ngx-Overlay-${_nextUniqueId++}`;
    overlay.classList.add('ngx-Overlay');

    config.container.nativeElement.appendChild(overlay);

    return overlay;
  }
}


export { NgxOverlayService };

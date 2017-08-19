import {
  Directive,
  OnDestroy,
  AfterViewInit,
  Input,
  Output,
  HostListener,
  EventEmitter,
  ViewContainerRef,
  ElementRef,
  Inject,
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { NgxTemplatePortal } from '../portal';
import {
  NGX_OVERLAY,
  NgxHorizontalConnectionPositionType,
  NgxVerticalConnectionPositionType,
  NgxConnectionPositionType,
  NgxConnectionPositionPairType,
  NgxOverlayConfig,
  NgxOverlayRef,
  NgxConnectedPositionStrategy,
  NgxPositionStrategyService,
  NgxOverlayService,
} from '../overlay';

import { MenuComponent } from './menu.component';
import { MenuPositionXType, MenuPositionYType } from './models';


/*
 This directive is intended to be used in conjunction with an ngx-menu tag.
 It is responsible for toggling the display of the provided menu instance.
*/
@Directive({
  selector: '[ngxMenuTrigger]',
})
class MenuTriggerDirective implements AfterViewInit, OnDestroy {
  private _menuOpened: boolean = false;
  private _portal: NgxTemplatePortal;
  private _overlayRef: NgxOverlayRef;
  private _backdropSubscription: Subscription;
  private _positionSubscription: Subscription;

  get menuOpened(): boolean { return this._menuOpened; }

  @Input('ngxMenuTrigger') menu: MenuComponent;

  @Output('onMenuOpen') menuOpenEmitter = new EventEmitter<void>();

  @Output('onMenuClose') menuCloseEmitter = new EventEmitter<void>();

  constructor (
    @Inject(ElementRef) private _elementRef: ElementRef,
    @Inject(ViewContainerRef) private _viewContainerRef: ViewContainerRef,
    @Inject(NgxPositionStrategyService) private _positionStrategyService: NgxPositionStrategyService,
    @Inject(NgxOverlayService) private _overlayService: NgxOverlayService,
  ) {}

  ngAfterViewInit () {
    if (!this.menu) {
      throw new Error('Menu component is required');
    }

    this.menu.closeEmitter.subscribe(() => this._closeMenu());
  }

  ngOnDestroy () { this._destroyMenu(); }

  @HostListener('click')
  private _toggleMenu (): void {
    return this._menuOpened ? this._closeMenu() : this._openMenu();
  }

  private _destroyMenu (): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;

      this._cleanUpSubscriptions();
    }
  }

  private _cleanUpSubscriptions (): void {
    if (this._backdropSubscription) {
      this._backdropSubscription.unsubscribe();
    }
    if (this._positionSubscription) {
      this._positionSubscription.unsubscribe();
    }
  }

  private _openMenu (): void {
    if (!this._menuOpened) {
      this._createOverlay();
      this._overlayRef.attachTemplate(this._portal);
      this._subscribeToBackdrop();
      this._initMenu();
    }
  }

  private _closeMenu (): void {
    if (this._overlayRef) {
      this._overlayRef.detach();
      this._backdropSubscription.unsubscribe();
      this._resetMenu();
    }
  }

  private _initMenu (): void {
    this._setIsMenuOpen(true);
  };

  private _resetMenu (): void {
    this._setIsMenuOpen(false);
  }

  private _setIsMenuOpen (isOpen: boolean): void {
    this._menuOpened = isOpen;
    this._menuOpened ? this.menuOpenEmitter.emit() : this.menuCloseEmitter.emit();
  }

  private _createOverlay (): void {
    if (!this._overlayRef) {
      this._portal = new NgxTemplatePortal(this.menu.templateRef, this._viewContainerRef);

      const config = this._getOverlayConfig();
      this._subscribeToPositions(config.positionStrategy as NgxConnectedPositionStrategy);
      this._overlayRef = this._overlayService.create(config);
    }
  }

  private _getOverlayConfig (): NgxOverlayConfig {
    const overlayState = new NgxOverlayConfig();
    overlayState.positionStrategy = this._getPosition();
    overlayState.hasBackdrop = true;
    overlayState.backdropClass = NGX_OVERLAY.BACKDROP_VARIANT_TRANSPARENT_CLASS;

    return overlayState;
  }

  private _getPosition (): NgxConnectedPositionStrategy  {
    const [_positionX, _fallbackX]: NgxHorizontalConnectionPositionType[] =
      this.menu.positionX === 'before' ? ['end', 'start'] : ['start', 'end'];

    const [_overlayY, _fallbackOverlayY]: NgxVerticalConnectionPositionType[] =
      this.menu.positionY === 'above' ? ['bottom', 'top'] : ['top', 'bottom'];

    let _originY = _overlayY;
    let _fallbackOriginY = _fallbackOverlayY;

    if (!this.menu.isOverlapped) {
      _originY = _overlayY === 'top' ? 'bottom' : 'top';
      _fallbackOriginY = _fallbackOverlayY === 'top' ? 'bottom' : 'top';
    }

    const strategy = this._positionStrategyService.createConnectedPositionStrategy(
      this._elementRef.nativeElement,
      { x: _positionX, y: _originY } as NgxConnectionPositionType,
      { x: _positionX, y: _overlayY }  as NgxConnectionPositionType
    );
    strategy.fallbackPositions = [
      {
        origin: { x: _fallbackX, y: _originY },
        overlay: { x: _fallbackX, y: _overlayY },
      } as NgxConnectionPositionPairType,
      {
        origin: { x: _positionX, y: _fallbackOriginY },
        overlay: { x: _positionX, y: _fallbackOverlayY },
      } as NgxConnectionPositionPairType,
      {
        origin: { x: _fallbackX, y: _fallbackOriginY },
        overlay: { x: _fallbackX, y: _fallbackOverlayY },
      } as NgxConnectionPositionPairType,
    ];

    return strategy;
  }
  /*
    Listens to changes in the position of the overlay and sets the correct classes
    on the menu based on the new position. This ensures the animation origin is always
    correct, even if a fallback position is used for the overlay.
  */
  private _subscribeToPositions (position: NgxConnectedPositionStrategy): void {
    this._positionSubscription = position.positionChange$.subscribe((change) => {
      const _positionX: MenuPositionXType = change.connectionPair.origin.x === 'start' ? 'after' : 'before';
      let _positionY: MenuPositionYType = change.connectionPair.origin.y === 'top' ? 'below' : 'above';

      if (!this.menu.isOverlapped) {
        _positionY = _positionY === 'below' ? 'above' : 'below';
      }

      this.menu.setPositionClasses(_positionX, _positionY);
    });
  }
  /*
    This method ensures that the menu closes when the overlay backdrop is clicked.
    We do not use first() here because doing so would not catch clicks from within
    the menu, and it would fail to unsubscribe properly. Instead, we unsubscribe
    explicitly when the menu is closed or destroyed.
  */
  private _subscribeToBackdrop (): void {
    this._backdropSubscription = this._overlayRef.backdropClick$.subscribe(() => {
      this._closeMenu();
    });
  }
}


export { MenuTriggerDirective };

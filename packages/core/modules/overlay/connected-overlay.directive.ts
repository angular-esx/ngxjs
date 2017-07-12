import {
  Directive,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ElementRef,
  ViewContainerRef,
  SimpleChanges,
  Inject,
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import {
  parseNumber,
  parseBoolean,
} from 'ngx-infrastructure';

import {
  NgxRenderService,
  NgxBrowserPlatformService,
} from '../../services';
import { NgxTemplatePortal } from '../portal';
import {
  NgxConnectionPositionType,
  NgxConnectionPositionPairType,
  NgxConnectedOverlayPositionChangedType,
  NgxConnectedPositionStrategy,
  NgxOverlayConfig,
  NgxConnectedOverlayConfig,
  NgxOverlayRef,
  INgxScrollStrategy,
  NgxRepositionScrollStrategy,
} from './models';
import {
  NgxPositionStrategyService,
  NgxScrollStrategyService,
  NgxOverlayService,
} from './services';
import { NgxOriginOverlayDirective } from './origin-overlay.directive';


/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
@Directive({
  selector: '[ngxConnectedOverlay]',
  exportAs: 'ngxConnectedOverlay',
})
class NgxConnectedOverlayDirective implements OnChanges, OnDestroy {
  protected _overlayRef: NgxOverlayRef;
  protected _templatePortal: NgxTemplatePortal;
  protected _positionStrategy: NgxConnectedPositionStrategy;
  protected _listeners: Array<Function> = [];

  protected _backdropSubscription: Subscription;
  protected _positionSubscription: Subscription;

  get overlayRef(): NgxOverlayRef {
    return this._overlayRef;
  }

  @Input('ngxConnectedOverlay') config: NgxConnectedOverlayConfig;


  constructor (
    @Inject(TemplateRef) templateRef: TemplateRef<any>,
    @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef,
    @Inject(NgxPositionStrategyService) protected _positionStrategyService: NgxPositionStrategyService,
    @Inject(NgxScrollStrategyService) protected _scrollStrategyService: NgxScrollStrategyService,
    @Inject(NgxOverlayService) protected _overlayService: NgxOverlayService,
    @Inject(NgxRenderService) protected _rendererService: NgxRenderService,
    @Inject(NgxBrowserPlatformService) protected _browserPlatformService: NgxBrowserPlatformService
  ) {
    this._templatePortal = new NgxTemplatePortal(templateRef, viewContainerRef);
  }

  ngOnChanges (changes: SimpleChanges): void {
    const _isFirstChange = changes['config'].isFirstChange;
    const _currentConfig = changes['config'].currentValue as NgxConnectedOverlayConfig;
    const _previousConfig = changes['config'].previousValue as NgxConnectedOverlayConfig;

    if (!_currentConfig) {
      throw new Error('NgxConnectedOverlay require a config.');
    }
    if (!_currentConfig.originOverlay) {
      throw new Error('NgxConnectedOverlayConfig require originOverlay.');
    }

    if (_isFirstChange || _currentConfig.isActive !== _previousConfig.isActive) {
      _currentConfig.isActive ? this._attachOverlay() : this._detachOverlay();
    }
    else if (
      !_isFirstChange &&
      (
        _currentConfig.offsetX !== _previousConfig.offsetX ||
        _currentConfig.offsetY !== _previousConfig.offsetY ||
        _currentConfig.originOverlay !== _previousConfig.originOverlay ||
        _currentConfig.connectedPositions !== _previousConfig.connectedPositions
      )
    ) {
      this._destroyOverlay();
      this._attachOverlay();
    }
  }

  ngOnDestroy (): void {
    this._destroyOverlay();
  }
  /**
   * Attaches the overlay and subscribes to backdrop clicks if backdrop exists
   */
  protected _attachOverlay (): void {
    if (!this._overlayRef) {
      this._createOverlay();
    }

    this._overlayRef.config.direction = this.config.direction;
    this._registerListeners();

    if (!this._overlayRef.hasAttached) {
      this._overlayRef.attachTemplate(this._templatePortal);

      if (this.config.onAttach) { this.config.onAttach(); }
    }

    if (this.config.hasBackdrop) {
      this._backdropSubscription = this._overlayRef.backdropClick$
      .subscribe(() => {
        if (this.config.onBackdropClick) { this.config.onBackdropClick(); }
      });
    }
  }
  /**
   * Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists
   */
  protected _detachOverlay (): void {
    if (this._overlayRef) {
      this._overlayRef.detach();

      if (this.config.onDetach) { this.config.onDetach(); }
    }

    if (this._backdropSubscription) {
      this._backdropSubscription.unsubscribe();
      this._backdropSubscription = null;
    }

    this._listeners.forEach(func => func());
  }
  /**
   * Destroys the overlay created by this directive.
   */
  protected _destroyOverlay () {
    if (this._overlayRef) {
      this._overlayRef.dispose();
    }

    if (this._backdropSubscription) {
      this._backdropSubscription.unsubscribe();
      this._backdropSubscription = null;
    }

    if (this._positionSubscription) {
      this._positionSubscription.unsubscribe();
      this._positionSubscription = null;
    }

    this._listeners.forEach(func => func());
  }

  protected _createOverlay () {
    if (!this.config.connectedPositions || this.config.connectedPositions.length === 0) {
      this.config.connectedPositions = [
        {
          origin: { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
          overlay: { x: 'start', y: 'top' } as NgxConnectionPositionType,
        } as NgxConnectionPositionPairType,
        {
          origin: { x: 'start', y: 'top' } as NgxConnectionPositionType,
          overlay: { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
        } as NgxConnectionPositionPairType,
      ];
    }

    if (!this.config.scrollStrategy) {
      this.config.scrollStrategy = this._scrollStrategyService.createRepositionScrollStrategy();
    }

    this._positionStrategy = this._createPositionStrategy();

    this._overlayRef = this._overlayService.create(
      this._templatePortal.viewContainerRef,
      {
        ...(this.config as NgxOverlayConfig),
        positionStrategy: this._positionStrategy,
      },
    );
  }

  protected _createPositionStrategy (): NgxConnectedPositionStrategy {
    const _position = this.config.connectedPositions[0];

    const strategy = this._positionStrategyService.createConnectedPositionStrategy(
      this.config.originOverlay.nativeElement,
      { x: _position.origin.x, y: _position.origin.y },
      { x: _position.overlay.x, y: _position.overlay.y }
    );
    strategy.direction = this.config.direction;
    strategy.offsetX = this.config.offsetX;
    strategy.offsetY = this.config.offsetY;
    strategy.fallbackPositions = this.config.connectedPositions;

    this._positionSubscription = strategy.positionChange$
    .subscribe(event => {
      if (this.config.onPositionChange) { this.config.onPositionChange(event); }
    });

    return strategy;
  }
  /**
   * Sets DOM event listeners for overlay.
   */
  protected _registerListeners (): void {
    this._listeners.push(
      this._rendererService.listen('document', 'keydown', (event: KeyboardEvent) => {
        /**
         * Handle keypress 'ESC'
         */
        if (event.keyCode === 27) {
          this._detachOverlay();
        }
      })
    );
  }
}


export {
  NgxConnectedOverlayDirective,
};

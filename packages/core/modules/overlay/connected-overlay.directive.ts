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
  unsubscribe,
} from 'ngx-infrastructure';

import {
  INgxRenderService,
  NgxRenderService,
  INgxBrowserPlatformService,
  NgxBrowserPlatformService,
} from '../../services';
import { NgxTemplatePortal } from '../portal';
import {
  NgxConnectionPositionType,
  NgxConnectionPositionPairType,
  NgxConnectedOverlayPositionChangedType,
  INgxConnectedPositionStrategy,
  NgxOverlayConfig,
  NgxConnectedOverlayConfig,
  INgxOverlayRef,
  INgxScrollStrategy,
} from './models';
import {
  INgxOverlayContainerService,
  NgxOverlayContainerService,
  INgxPositionStrategyService,
  NgxPositionStrategyService,
  INgxScrollStrategyService,
  NgxScrollStrategyService,
  INgxOverlayService,
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
  protected _immutableProperties = ['originOverlay', 'container', 'scrollStrategy'];

  protected _overlayRef: INgxOverlayRef;
  protected _templatePortal: NgxTemplatePortal<any>;
  protected _positionStrategy: INgxConnectedPositionStrategy;
  protected _listeners: Array<Function> = [];

  protected _backdropSubscription: Subscription;
  protected _positionSubscription: Subscription;

  get overlayRef(): INgxOverlayRef {
    return this._overlayRef;
  }

  @Input('ngxConnectedOverlay') config: NgxConnectedOverlayConfig;


  constructor (
    @Inject(TemplateRef) templateRef: TemplateRef<any>,
    @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef,
    @Inject(NgxOverlayContainerService) protected _overlayContainerService: INgxOverlayContainerService,
    @Inject(NgxPositionStrategyService) protected _positionStrategyService: INgxPositionStrategyService,
    @Inject(NgxScrollStrategyService) protected _scrollStrategyService: INgxScrollStrategyService,
    @Inject(NgxOverlayService) protected _overlayService: INgxOverlayService,
    @Inject(NgxRenderService) protected _rendererService: INgxRenderService,
    @Inject(NgxBrowserPlatformService) protected _browserPlatformService: INgxBrowserPlatformService
  ) {
    this._templatePortal = new NgxTemplatePortal(templateRef, viewContainerRef);
  }

  ngOnChanges (changes: SimpleChanges): void {
    const _currentConfig = changes['config'].currentValue as NgxConnectedOverlayConfig;
    const _previousConfig = changes['config'].previousValue as NgxConnectedOverlayConfig;

    if (!_currentConfig || !_currentConfig.originOverlay) { return; }

    if (_previousConfig) {
      if (this._immutableProperties.some(prop => _currentConfig[prop] !== _previousConfig[prop])) {
        this._destroyOverlay();
      }
      else if (_previousConfig.isActive) {
        this._detachOverlay();
      }
    }
    if (_currentConfig.isActive) {
      this._attachOverlay();
    }
  }

  ngOnDestroy (): void {
    this._destroyOverlay();
  }

  protected _attachOverlay (): void {
    if (!this._overlayRef) {
      this._overlayRef = this._overlayService.create(this._createOverlayConfig());
    }
    else if (!this._overlayRef.hasAttached) {
      this._overlayRef.config = this._createOverlayConfig();
    }

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

  protected _detachOverlay (): void {
    if (this._overlayRef) {
      this._overlayRef.detach();

      if (this.config.onDetach) { this.config.onDetach(); }
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
    this._listeners = [];
  }

  protected _destroyOverlay (): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;

      if (this.config.onDetach) { this.config.onDetach(); }
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
    this._listeners = [];
  }

  protected _createOverlayConfig (): NgxOverlayConfig {
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

    if (this._overlayRef && !this._overlayRef.hasAttached) {
      (this.overlayRef.config.positionStrategy as INgxConnectedPositionStrategy)
      .setDirection(this.config.direction)
      .setOffsetX(this.config.offsetX)
      .setOffsetY(this.config.offsetY)
      .clearFallbackPositions()
      .addFallbackPositions(...this.config.connectedPositions);

      const _config = {};
      Object.keys(this.config)
      .filter(key => this._immutableProperties.indexOf(key) === -1)
      .forEach(key => _config[key] = this.config[key]);

      return {
        ...this.overlayRef.config,
        ..._config,
      } as NgxOverlayConfig;
    }

    if (!this.config.container) {
      this.config.container = this._overlayContainerService.createOverlayContainer();
    }

    if (!this.config.scrollStrategy) {
      this.config.scrollStrategy = this._scrollStrategyService.createRepositionScrollStrategy();
    }

    this._positionStrategy = this._createPositionStrategy();

    return {
      ...(this.config as NgxOverlayConfig),
      positionStrategy: this._positionStrategy,
    };
  }

  protected _createPositionStrategy (): INgxConnectedPositionStrategy {
    const _position = this.config.connectedPositions[0];

    const strategy = this._positionStrategyService.createConnectedPositionStrategy(
      this.config.originOverlay.nativeElement,
      { x: _position.origin.x, y: _position.origin.y },
      { x: _position.overlay.x, y: _position.overlay.y }
    )
    .setDirection(this.config.direction)
    .setOffsetX(this.config.offsetX)
    .setOffsetY(this.config.offsetY)
    .addFallbackPositions(...(this.config.connectedPositions).filter((item, index) => index > 0));

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

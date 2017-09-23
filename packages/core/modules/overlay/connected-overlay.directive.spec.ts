import {
  Component,
  AfterContentInit,
  ViewChild,
  ViewEncapsulation,
  Inject,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  TestBed,
  async,
  inject,
  ComponentFixture,
} from '@angular/core/testing';

import {
  NgxOverlayConfig,
  NgxConnectedOverlayConfig,
  NgxConnectedOverlayPositionChangedType,
  NgxConnectedPositionStrategy,
  NgxOriginOverlayDirective,
  NgxConnectedOverlayDirective,
  NgxOverlayContainerService,
  NgxScrollStrategyService,
  NgxOverlayModule,
} from '../overlay/';


@Component({
  template: `
    <button ngxOverlayOrigin>Toggle menu</button>

    <ng-template [ngxConnectedOverlay]="config">
      <p>Menu content</p>
    </ng-template>
  `,
  styles: ['./styles/index'],
  encapsulation: ViewEncapsulation.None,
})
class NgxTestConnectedOverlayComponent implements AfterContentInit {
  private _attachedResult: HTMLElement;
  private _isClickedbackdrop: boolean;
  private _positionChangeHandler = jasmine.createSpy('positionChangeHandler');
  private _attachHandler = jasmine.createSpy('attachHandler').and.callFake(() => {
    this._attachedResult = this.connectedOverlayDirective.overlayRef.overlayElement.querySelector('p') as HTMLElement;
  });
  private _detachHandler = jasmine.createSpy('detachHandler');

  config: NgxConnectedOverlayConfig;

  get attachedResult(): HTMLElement {
    return this._attachedResult;
  }
  get isClickedbackdrop(): boolean {
    return this._isClickedbackdrop;
  }
  get positionChangeHandler(): jasmine.Spy {
    return this._positionChangeHandler;
  }
  get attachHandler(): jasmine.Spy {
    return this._attachHandler;
  }
  get detachHandler(): jasmine.Spy {
    return this._detachHandler;
  }

  @ViewChild(NgxOriginOverlayDirective) originOverlayDirective: NgxOriginOverlayDirective;
  @ViewChild(NgxConnectedOverlayDirective) connectedOverlayDirective: NgxConnectedOverlayDirective;


  ngAfterContentInit (): void {
    this.config = {
      ...(new NgxOverlayConfig()),
      originOverlay: this.originOverlayDirective,
      onBackdropClick: () => { this._isClickedbackdrop = true; },
      onPositionChange: (event: NgxConnectedOverlayPositionChangedType) => { this._positionChangeHandler(event); },
      onAttach: () => { this._attachHandler(); },
      onDetach: () => { this._detachHandler(); },
    } as NgxConnectedOverlayConfig;
  }
}


describe('Overlay directives', () => {
  let _connectedOverlayConfig: NgxConnectedOverlayConfig;
  let _connectedOverlayComponent: ComponentFixture<NgxTestConnectedOverlayComponent>;
  let _overlayContainerService: NgxOverlayContainerService;
  let _scrollStrategyService: NgxScrollStrategyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxOverlayModule],
      declarations: [NgxTestConnectedOverlayComponent],
    })
    .compileComponents();
  }));

  beforeEach(inject([
    NgxOverlayContainerService,
    NgxScrollStrategyService,
  ],
  (overlayContainerService: NgxOverlayContainerService,
    scrollStrategyService: NgxScrollStrategyService
  ) => {
    _overlayContainerService = overlayContainerService;
    _scrollStrategyService = scrollStrategyService;

    _connectedOverlayComponent = TestBed.createComponent(NgxTestConnectedOverlayComponent);
    _connectedOverlayComponent.detectChanges();

    _connectedOverlayConfig = _connectedOverlayComponent.componentInstance.config;
  }));

  it(`should attach the overlay based on the open property`, () => {
    _connectedOverlayComponent.componentInstance.config = {
      ..._getConnectedOverlayConfig(),
      isActive: true,
    };
    _connectedOverlayComponent.detectChanges();

    expect(_getOverlayContainerElement().textContent).toContain('Menu content');
    expect(_getOverlayElement().style.pointerEvents)
    .toBe('auto', 'Expected the overlay to enable pointerEvents when attached.');

    _connectedOverlayComponent.componentInstance.config = {
      ..._getConnectedOverlayConfig(),
      isActive: false,
    };
    _connectedOverlayComponent.detectChanges();

    expect(_getOverlayContainerElement().textContent).toBe('');
  });

  it('should destroy the overlay when the directive is destroyed', () => {
    _connectedOverlayComponent.componentInstance.config = {
      ..._getConnectedOverlayConfig(),
      isActive: true,
    };
    _connectedOverlayComponent.detectChanges();
    _connectedOverlayComponent.destroy();

    expect(_getOverlayContainerElement()).toBeNull();
    expect(_getOverlayElement()).toBeFalsy('Expected the overlay element to be removed when disposed.');
  });

  it('should destroy the overlay when change container', () => {
    _connectedOverlayComponent.componentInstance.config = {
      ..._getConnectedOverlayConfig(),
      isActive: true,
    };
    _connectedOverlayComponent.detectChanges();

    const _oldOverlayRef = _connectedOverlayComponent.componentInstance.connectedOverlayDirective.overlayRef;

    _connectedOverlayComponent.componentInstance.config = {
      ..._getConnectedOverlayConfig(),
      isActive: true,
      container: _overlayContainerService.createOverlayContainer(),
    };
    _connectedOverlayComponent.detectChanges();

    expect(_connectedOverlayComponent.componentInstance.connectedOverlayDirective.overlayRef === _oldOverlayRef).toBeFalsy();
  });

  it('should destroy the overlay when change scroll strategy', () => {
    _connectedOverlayComponent.componentInstance.config = {
      ..._getConnectedOverlayConfig(),
      isActive: true,
    };
    _connectedOverlayComponent.detectChanges();

    const _oldOverlayRef = _connectedOverlayComponent.componentInstance.connectedOverlayDirective.overlayRef;

    _connectedOverlayComponent.componentInstance.config = {
      ..._getConnectedOverlayConfig(),
      isActive: true,
      scrollStrategy: _scrollStrategyService.createRepositionScrollStrategy(),
    };
    _connectedOverlayComponent.detectChanges();

    expect(_connectedOverlayComponent.componentInstance.connectedOverlayDirective.overlayRef === _oldOverlayRef).toBeFalsy();
  });

  it('should use a connected position strategy with a default set of positions', () => {
    _connectedOverlayComponent.componentInstance.config = {
      ..._getConnectedOverlayConfig(),
      isActive: true,
    };
    _connectedOverlayComponent.detectChanges();

    expect(
      _connectedOverlayComponent.componentInstance.connectedOverlayDirective.overlayRef.config.positionStrategy
      instanceof NgxConnectedPositionStrategy
    ).toBe(true);
  });

  it('should set and update the `dir` attribute', () => {
    _connectedOverlayComponent.componentInstance.config = {
      ..._getConnectedOverlayConfig(),
      isActive: true,
      direction: 'rtl',
    };
    _connectedOverlayComponent.detectChanges();

    expect(_getOverlayElement().getAttribute('dir')).toBe('rtl');

    _connectedOverlayComponent.componentInstance.config = {
      ..._getConnectedOverlayConfig(),
      isActive: false,
    };
    _connectedOverlayComponent.detectChanges();

    _connectedOverlayComponent.componentInstance.config = {
      ..._getConnectedOverlayConfig(),
      isActive: true,
      direction: 'ltr',
    };
    _connectedOverlayComponent.detectChanges();

    expect(_getOverlayElement().getAttribute('dir')).toBe('ltr');
  });

  it('should close when pressing escape', () => {
    _connectedOverlayComponent.componentInstance.config = {
      ..._getConnectedOverlayConfig(),
      isActive: true,
    };
    _connectedOverlayComponent.detectChanges();

    _dispatchKeyboardEvent(document, 'keydown', 27);
    _connectedOverlayComponent.detectChanges();

    expect(_getOverlayContainerElement().textContent.trim()).toBe('', 'Expected overlay to have been detached.');
  });

  describe('inputs', () => {

    it('should set the width', () => {
      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: true,
        width: 250,
      };
      _connectedOverlayComponent.detectChanges();

      expect(_getOverlayElement().style.width).toEqual('250px');
    });

    it('should set the height', () => {
      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: true,
        height: '100vh',
      };
      _connectedOverlayComponent.detectChanges();

      expect(_getOverlayElement().style.height).toEqual('100vh');
    });

    it('should set the min width', () => {
      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: true,
        minWidth: 250,
      };
      _connectedOverlayComponent.detectChanges();

      expect(_getOverlayElement().style.minWidth).toEqual('250px');
    });

    it('should set the min height', () => {
      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: true,
        minHeight: '500px',
      };
      _connectedOverlayComponent.detectChanges();

      expect(_getOverlayElement().style.minHeight).toEqual('500px');
    });

    it('should create the backdrop if designated', () => {
      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: true,
        hasBackdrop: true,
      };
      _connectedOverlayComponent.detectChanges();

      expect(_getOverlayContainerElement().querySelector('.ngx-OverlayBackdrop')).toBeTruthy();
    });

    it('should not create the backdrop by default', () => {
      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: true,
      };
      _connectedOverlayComponent.detectChanges();

      expect(_getOverlayContainerElement().querySelector('.ngx-OverlayBackdrop')).toBeNull();
    });

    it('should set the custom backdrop class', () => {
      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: true,
        hasBackdrop: true,
        backdropClass: 'ngx-custom-backdrop',
      };
      _connectedOverlayComponent.detectChanges();

      expect(_getOverlayContainerElement().querySelector('.ngx-OverlayBackdrop').classList).toContain('ngx-custom-backdrop');
    });

    it('should set the offsetX', () => {
      const _startX = _connectedOverlayComponent.debugElement.query(By.css('button')).nativeElement.getBoundingClientRect().left;

      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: true,
        offsetX: 5,
      };
      _connectedOverlayComponent.detectChanges();
      expect(_getOverlayElement().style.left)
      .toBe(_startX + 5 + 'px', `Expected overlay translateX to equal the original X + the offsetX.`);

      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: false,
      };
      _connectedOverlayComponent.detectChanges();

      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: true,
        offsetX: 15,
      };
      _connectedOverlayComponent.detectChanges();
      expect(_getOverlayElement().style.left)
      .toBe(_startX + 15 + 'px', `Expected overlay directive to reflect new offsetX if it changes.`);
    });

    it('should set the offsetY', () => {
      const _trigger = _connectedOverlayComponent.debugElement.query(By.css('button')).nativeElement;
      _trigger.style.position = 'absolute';
      _trigger.style.top = '30px';
      _trigger.style.height = '20px';

      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: true,
        offsetY: 45,
      };
      _connectedOverlayComponent.detectChanges();
      // expected y value is the starting y + _trigger height + offset y
      // 30 + 20 + 45 = 95px
      expect(_getOverlayElement().style.top)
      .toBe('95px', `Expected overlay translateY to equal the start Y + height + offsetY.`);

      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: false,
      };
      _connectedOverlayComponent.detectChanges();

      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: true,
        offsetY: 55,
      };
      _connectedOverlayComponent.detectChanges();
      expect(_getOverlayElement().style.top)
      .toBe('105px', `Expected overlay directive to reflect new offsetY if it changes.`);
    });
  });

  describe('outputs', () => {
    it('should emit backdropClick appropriately', () => {
      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: true,
        hasBackdrop: true,
      };
      _connectedOverlayComponent.detectChanges();

      (_getOverlayContainerElement().querySelector('.ngx-OverlayBackdrop') as HTMLElement).click();
      _connectedOverlayComponent.detectChanges();

      expect(_connectedOverlayComponent.componentInstance.isClickedbackdrop).toBe(true);
    });

    it('should emit NgxConnectedOverlayPositionChangedType appropriately', () => {
      expect(_connectedOverlayComponent.componentInstance.positionChangeHandler).not.toHaveBeenCalled();
      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: true,
      };
      _connectedOverlayComponent.detectChanges();

      expect(_connectedOverlayComponent.componentInstance.positionChangeHandler).toHaveBeenCalled();
    });

    it('should emit attach and detach appropriately', () => {
      expect(_connectedOverlayComponent.componentInstance.attachHandler).not.toHaveBeenCalled();
      expect(_connectedOverlayComponent.componentInstance.detachHandler).not.toHaveBeenCalled();
      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: true,
      };
      _connectedOverlayComponent.detectChanges();

      expect(_connectedOverlayComponent.componentInstance.attachHandler).toHaveBeenCalled();
      expect(_connectedOverlayComponent.componentInstance.attachedResult instanceof HTMLElement)
      .toBe(true, `Expected pane to be populated with HTML elements when attach was called.`);
      expect(_connectedOverlayComponent.componentInstance.detachHandler).not.toHaveBeenCalled();

      _connectedOverlayComponent.componentInstance.config = {
        ..._getConnectedOverlayConfig(),
        isActive: false,
      };
      _connectedOverlayComponent.detectChanges();
      expect(_connectedOverlayComponent.componentInstance.detachHandler).toHaveBeenCalled();
    });

  });

  function _getOverlayContainerElement (): HTMLElement {
    const _overlayRef = _connectedOverlayComponent.componentInstance.connectedOverlayDirective.overlayRef;

    return _overlayRef
     ? _overlayRef.config.container.nativeElement
     : null;
  }

  function _getOverlayElement (): HTMLElement {
    const _overlayContainerElement = _getOverlayContainerElement();

    return _overlayContainerElement
      ? _overlayContainerElement.querySelector('.ngx-Overlay') as HTMLElement
      : null;
  }

  function _getConnectedOverlayConfig (): NgxConnectedOverlayConfig {
    return {
      ..._connectedOverlayConfig,
      container: _connectedOverlayComponent.componentInstance.connectedOverlayDirective.config.container,
      scrollStrategy: _connectedOverlayComponent.componentInstance.connectedOverlayDirective.config.scrollStrategy,
    };
  }
  /** Utility to dispatch any event on a Node. */
  function _dispatchEvent (node: Node | Window, event: Event): Event {
    node.dispatchEvent(event);
    return event;
  }
  /** Shorthand to dispatch a keyboard event with a specified key code. */
  function _dispatchKeyboardEvent (node: Node, type: string, keyCode: number): KeyboardEvent {
    return _dispatchEvent(node, _createKeyboardEvent(type, keyCode)) as KeyboardEvent;
  }
  /** Dispatches a keydown event from an element. */
  function _createKeyboardEvent (type: string, keyCode: number, target?: Element, key?: string): any {
    const event = document.createEvent('KeyboardEvent') as any;
    // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
    const initEventFn = (event.initKeyEvent || event.initKeyboardEvent).bind(event);
    const originalPreventDefault = event.preventDefault;

    initEventFn(type, true, true, window, 0, 0, 0, 0, 0, keyCode);

    // Webkit Browsers don't set the keyCode when calling the init function.
    // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
    Object.defineProperties(event, {
      keyCode: { get: () => keyCode },
      key: { get: () => key },
      target: { get: () => target }
    });

    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    event.preventDefault = function () {
      Object.defineProperty(event, 'defaultPrevented', { get: () => true });
      /* tslint:disable: no-invalid-this */
      return originalPreventDefault.apply(this, arguments);
    };

    return event;
  }
});

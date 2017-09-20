import {
  NgModule,
  Component,
  ViewChild,
  ViewContainerRef,
  Inject,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  async,
  inject,
} from '@angular/core/testing';

import { NgxServiceModule } from '../../../services/';
import {
  NgxComponentPortal,
  NgxTemplatePortal,
  NgxTemplatePortalDirective,
  NgxPortalModule,
} from '../../portal';
import {
  INgxPositionStrategy,
  INgxScrollStrategy,
  NgxOverlayContainer,
  NgxOverlayContainerService,
  NgxPositionStrategyService,
  NgxScrollStrategyService,
  NgxOverlayRef,
  NgxOverlayConfig,
  NgxOverlayService,
  NgxOverlayModule,
} from '../../overlay';


class NgxFakePositionStrategy implements INgxPositionStrategy {
  element: HTMLElement;

  attach (overlayRef: NgxOverlayRef): this {
    this.element = overlayRef.overlayElement;

    return this;
  }

  apply (): void {
    this.element.classList.add('fake-positioned');
  }

  dispose (): void { return; }
}


class NgxFakeScrollStrategy implements INgxScrollStrategy {
  isEnabled = false;
  overlayRef: NgxOverlayRef;

  attach (overlayRef: NgxOverlayRef): this {
    this.overlayRef = overlayRef;

    return this;
  }

  enable (): void {
    this.isEnabled = true;
  }

  disable (): void {
    this.isEnabled = false;
  }
}

@Component({
  selector: 'ngx-test-portal',
  template: '<p>NgxTestPortalComponent</p>',
})
class NgxTestPortalComponent { }


@Component({
  selector: 'ngx-test-template-portal',
  template: '<ng-template ngxPortal>NgxTestTemplatePortalComponent</ng-template>',
})
class NgxTestTemplatePortalComponent {
  @ViewChild(NgxTemplatePortalDirective) templatePortal: NgxTemplatePortalDirective;

  constructor (@Inject(ViewContainerRef) public viewContainerRef: ViewContainerRef) {}
}

@NgModule({
  imports: [
    NgxOverlayModule,
    NgxPortalModule,
    NgxServiceModule,
  ],
  declarations: [NgxTestPortalComponent, NgxTestTemplatePortalComponent],
  entryComponents: [NgxTestPortalComponent, NgxTestTemplatePortalComponent],
  exports: [NgxTestPortalComponent, NgxTestTemplatePortalComponent],
})
class NgxOverlayTestModule { }


describe('Overlay', () => {
  let _overlayConfig: NgxOverlayConfig;
  let _overlayService: NgxOverlayService;
  let _componentPortal: NgxComponentPortal<NgxTestPortalComponent>;
  let _templatePortal: NgxTemplatePortal<any>;
  let _overlayContainerElement: HTMLElement;
  let _viewContainerFixture: ComponentFixture<NgxTestTemplatePortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxOverlayTestModule],
    })
    .compileComponents();
  }));

  beforeEach(inject([
    NgxOverlayContainerService,
    NgxPositionStrategyService,
    NgxScrollStrategyService,
    NgxOverlayService,
  ],
  (overlayContainerServicer: NgxOverlayContainerService,
    positionStrategyService: NgxPositionStrategyService,
    scrollStrategyService: NgxScrollStrategyService,
    overlayService: NgxOverlayService
  ) => {
    _overlayConfig = new NgxOverlayConfig();
    _overlayConfig.container = overlayContainerServicer.createOverlayContainer();
    _overlayConfig.positionStrategy = positionStrategyService.createGlobalPositionStrategy();
    _overlayConfig.scrollStrategy = scrollStrategyService.createNoopScrollStrategy();

    _overlayContainerElement = _overlayConfig.container.nativeElement;

    _overlayService = overlayService;

    const _fixture = TestBed.createComponent(NgxTestTemplatePortalComponent);
    _fixture.detectChanges();

    _viewContainerFixture = _fixture;
    _templatePortal = _fixture.componentInstance.templatePortal;
    _componentPortal = new NgxComponentPortal(NgxTestPortalComponent, _fixture.componentInstance.viewContainerRef);
  }));

  it('should load a component into an overlay', () => {
    const _overlayRef = _overlayService.create(_overlayConfig);
    _overlayRef.attachComponent(_componentPortal);

    expect(_overlayContainerElement.textContent).toContain('NgxTestPortalComponent');

    _overlayRef.dispose();
    expect(_overlayContainerElement.childNodes.length).toBe(0);
    expect(_overlayContainerElement.textContent).toBe('');
  });

  it('should load a template portal into an overlay', () => {
    const _overlayRef = _overlayService.create(_overlayConfig);
    _overlayRef.attachTemplate(_templatePortal);

    expect(_overlayContainerElement.textContent).toContain('NgxTestTemplatePortalComponent');

    _overlayRef.dispose();
    expect(_overlayContainerElement.childNodes.length).toBe(0);
    expect(_overlayContainerElement.textContent).toBe('');
  });

  it('should disable pointer events of the pane element if detached', () => {
    const _overlayRef = _overlayService.create(_overlayConfig);
    const _overlayElement = _overlayRef.overlayElement;

    _overlayRef.attachComponent(_componentPortal);
    _viewContainerFixture.detectChanges();

    expect(_overlayElement.childNodes.length).not.toBe(0);
    expect(_overlayElement.style.pointerEvents)
    .toBe('auto', 'Expected the overlay pane to enable pointerEvents when attached.');

    _overlayRef.detach();

    expect(_overlayElement.childNodes.length).toBe(0);
    expect(_overlayElement.style.pointerEvents)
    .toBe('none', 'Expected the overlay pane to disable pointerEvents when detached.');
  });

  it('should open multiple overlays', () => {
    const _componentPortalOverlayRef = _overlayService.create(_overlayConfig);
    _componentPortalOverlayRef.attachComponent(_componentPortal);

    const _templatePortalOverlayRef = _overlayService.create(_overlayConfig);
    _templatePortalOverlayRef.attachTemplate(_templatePortal);

    const _positionStrategyElement = Array.prototype.slice.apply(_overlayContainerElement.children)[0];

    expect(_positionStrategyElement.childNodes.length).toBe(2);
    expect(_positionStrategyElement.textContent).toContain('NgxTestPortalComponent');
    expect(_positionStrategyElement.textContent).toContain('NgxTestTemplatePortalComponent');

    _componentPortalOverlayRef.dispose();
    expect(_positionStrategyElement.childNodes.length).toBe(1);
    expect(_positionStrategyElement.textContent).toContain('NgxTestTemplatePortalComponent');

    _templatePortalOverlayRef.dispose();
    expect(_positionStrategyElement.childNodes.length).toBe(0);
    expect(_positionStrategyElement.textContent).toBe('');
  });

  it('should ensure that the most-recently-attached overlay is on top', () => {
    let _componentPortalOverlayRef = _overlayService.create(_overlayConfig);
    _componentPortalOverlayRef.attachComponent(_componentPortal);

    const _templatePortalOverlayRef = _overlayService.create(_overlayConfig);
    _templatePortalOverlayRef.attachTemplate(_templatePortal);

    expect(_componentPortalOverlayRef.overlayElement.nextSibling)
    .toBeTruthy('Expected NgxTestPortalComponent to be on the bottom.');
    expect(_templatePortalOverlayRef.overlayElement.nextSibling)
    .toBeFalsy('Expected NgxTestTemplatePortalComponent to be on top.');

    _componentPortalOverlayRef.dispose();
    _templatePortalOverlayRef.detach();

    _componentPortalOverlayRef = _overlayService.create(_overlayConfig);
    _componentPortalOverlayRef.attachComponent(_componentPortal);

    _templatePortalOverlayRef.attachTemplate(_templatePortal);

    expect(_componentPortalOverlayRef.overlayElement.nextSibling)
    .toBeTruthy('Expected NgxTestPortalComponent to still be on the bottom.');
    expect(_templatePortalOverlayRef.overlayElement.nextSibling)
    .toBeFalsy('Expected NgxTestTemplatePortalComponent to still be on top.');
  });

  it('should set the direction', () => {
    _overlayConfig.direction = 'rtl';

    const _overlayRef = _overlayService.create(_overlayConfig);
    _overlayRef.attachComponent(_componentPortal);

    expect(_overlayRef.overlayElement.getAttribute('dir')).toEqual('rtl');
  });

  it('should emit when an overlay is attached', () => {
    const _overlayRef = _overlayService.create(_overlayConfig);
    const _spy = jasmine.createSpy('attachments spy');

    _overlayRef.attach$.subscribe(_spy);
    _overlayRef.attachComponent(_componentPortal);

    expect(_spy).toHaveBeenCalled();
  });

  it('should emit the attachment event after everything is added to the DOM', () => {
    _overlayConfig.hasBackdrop = true;
    const _overlayRef = _overlayService.create(_overlayConfig);

    _overlayRef.attach$.subscribe(() => {
      expect(_overlayContainerElement.querySelector('ngx-test-portal'))
      .toBeTruthy('Expected the overlay to have been attached.');

      expect(_overlayContainerElement.querySelector('.ngx-OverlayBackdrop'))
      .toBeTruthy('Expected the backdrop to have been attached.');
    });

    _overlayRef.attachComponent(_componentPortal);
  });

  it('should emit when an overlay is detached', () => {
    const _overlayRef = _overlayService.create(_overlayConfig);
    const spy = jasmine.createSpy('detachments spy');

    _overlayRef.detach$.subscribe(spy);

    _overlayRef.attachComponent(_componentPortal);

    _overlayRef.detach();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit the detachment event after the overlay is removed from the DOM', () => {
    const _overlayRef = _overlayService.create(_overlayConfig);

    _overlayRef.detach$.subscribe(() => {
      expect(_overlayContainerElement.querySelector('ngx-test-portal'))
      .toBeFalsy('Expected the overlay to have been detached.');
    });

    _overlayRef.attachComponent(_componentPortal);

    _overlayRef.detach();
  });

  it('should emit and complete the observables when an overlay is disposed', () => {
    const _overlayRef = _overlayService.create(_overlayConfig);

    const disposeSpy = jasmine.createSpy('dispose spy');
    const attachCompleteSpy = jasmine.createSpy('attachCompleteSpy spy');
    const detachCompleteSpy = jasmine.createSpy('detachCompleteSpy spy');

    _overlayRef.attach$.subscribe(undefined, undefined, attachCompleteSpy);
    _overlayRef.detach$.subscribe(disposeSpy, undefined, detachCompleteSpy);

    _overlayRef.attachComponent(_componentPortal);
    _overlayRef.dispose();

    expect(disposeSpy).toHaveBeenCalled();
    expect(attachCompleteSpy).toHaveBeenCalled();
    expect(detachCompleteSpy).toHaveBeenCalled();
  });

  it('should complete the attachment observable before the detachment one', () => {
    const _overlayRef = _overlayService.create(_overlayConfig);
    const _callbackOrder: string[] = [];

    _overlayRef.attach$.subscribe(undefined, undefined, () => _callbackOrder.push('attach'));
    _overlayRef.detach$.subscribe(undefined, undefined, () => _callbackOrder.push('detach'));

    _overlayRef.attachComponent(_componentPortal);
    _overlayRef.dispose();

    expect(_callbackOrder).toEqual(['attach', 'detach']);
  });

  describe('positioning', () => {
    it('should apply the positioning strategy', () => {
      _overlayConfig.positionStrategy = new NgxFakePositionStrategy();

      _overlayService.create(_overlayConfig).attachComponent(_componentPortal);

      expect(_overlayContainerElement.querySelectorAll('.fake-positioned').length).toBe(1);
    });
  });

  describe('size', () => {
    it('should apply the width set in the config', () => {
      _overlayConfig.width = 500;

      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      expect(_overlayRef.overlayElement.style.width).toEqual('500px');
    });

    it('should support using other units if a string width is provided', () => {
      _overlayConfig.width = '200%';

      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      expect(_overlayRef.overlayElement.style.width).toEqual('200%');
    });

    it('should apply the height set in the config', () => {
      _overlayConfig.height = 500;

      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      expect(_overlayRef.overlayElement.style.height).toEqual('500px');
    });

    it('should support using other units if a string height is provided', () => {
      _overlayConfig.height = '100vh';

      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      expect(_overlayRef.overlayElement.style.height).toEqual('100vh');
    });

    it('should apply the min width set in the config', () => {
      _overlayConfig.minWidth = 200;

      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      expect(_overlayRef.overlayElement.style.minWidth).toEqual('200px');
    });


    it('should apply the min height set in the config', () => {
      _overlayConfig.minHeight = 500;

      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      expect(_overlayRef.overlayElement.style.minHeight).toEqual('500px');
    });

    it('should apply the max width set in the config', () => {
      _overlayConfig.maxWidth = 200;

      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      expect(_overlayRef.overlayElement.style.maxWidth).toEqual('200px');
    });


    it('should apply the max height set in the config', () => {
      _overlayConfig.maxHeight = 500;

      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      expect(_overlayRef.overlayElement.style.maxHeight).toEqual('500px');
    });

    it('should support zero widths and heights', () => {
      _overlayConfig.width = 0;
      _overlayConfig.height = 0;

      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      expect(_overlayRef.overlayElement.style.width).toEqual('0px');
      expect(_overlayRef.overlayElement.style.height).toEqual('0px');
    });
  });

  describe('backdrop', () => {
    beforeEach(() => {
      _overlayConfig.hasBackdrop = true;
    });

    it('should create and destroy an overlay backdrop', () => {
      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      _viewContainerFixture.detectChanges();

      const _backdropElement = _overlayContainerElement.querySelector('.ngx-OverlayBackdrop') as HTMLElement;
      expect(_backdropElement).toBeTruthy();
      expect(_backdropElement.classList).not.toContain('ngx-OverlayBackdrop_state_active');

      const _backdropClickHandler = jasmine.createSpy('backdropClickHander');
      _overlayRef.backdropClick$.subscribe(_backdropClickHandler);

      _backdropElement.click();
      expect(_backdropClickHandler).toHaveBeenCalled();
    });

    it('should complete the backdrop click stream once the overlay is destroyed', () => {
      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      _viewContainerFixture.detectChanges();

      const completeHandler = jasmine.createSpy('backdrop complete handler');

      _overlayRef.backdropClick$.subscribe(undefined, undefined, completeHandler);
      _overlayRef.dispose();

      expect(completeHandler).toHaveBeenCalled();
    });

    it('should apply the default overlay backdrop class', () => {
      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      _viewContainerFixture.detectChanges();

      const _backdropElement = _overlayContainerElement.querySelector('.ngx-OverlayBackdrop') as HTMLElement;
      expect(_backdropElement.classList).toContain('ngx-OverlayBackdrop_variant_dark');
    });

    it('should apply a custom overlay backdrop class', () => {
      _overlayConfig.backdropClass = 'ngx-OverlayBackdrop_variant_transparent';

      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      _viewContainerFixture.detectChanges();

      const _backdropElement = _overlayContainerElement.querySelector('.ngx-OverlayBackdrop') as HTMLElement;
      expect(_backdropElement.classList).toContain('ngx-OverlayBackdrop_variant_transparent');
    });

    it('should disable the pointer events of a backdrop that is being removed', () => {
      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      _viewContainerFixture.detectChanges();

      const _backdropElement = _overlayContainerElement.querySelector('.ngx-OverlayBackdrop') as HTMLElement;
      expect(_backdropElement.style.pointerEvents).toBeFalsy();

      _overlayRef.detach();

      expect(_backdropElement.style.pointerEvents).toBe('none');
    });

    it('should insert the backdrop before the overlay pane in the DOM order', () => {
      const _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);

      _viewContainerFixture.detectChanges();

      const _backdropElement = _overlayContainerElement.querySelector('.ngx-OverlayBackdrop');
      const _overlayElement = _overlayContainerElement.querySelector('.ngx-Overlay');
      const _positionStrategyElementChildren = Array.prototype.slice.call(_overlayContainerElement.children[0].children);

      expect(_positionStrategyElementChildren.indexOf(_backdropElement)).toBeGreaterThan(-1);
      expect(_positionStrategyElementChildren.indexOf(_overlayElement)).toBeGreaterThan(-1);
      expect(_positionStrategyElementChildren.indexOf(_backdropElement))
      .toBeLessThan(_positionStrategyElementChildren.indexOf(_overlayElement), 'Expected backdrop to be before the overlay in the DOM');
    });

  });

  describe('overlayClasses', () => {
    it('should apply a custom overlay class', () => {
      _overlayConfig.overlayClasses = ['custom-overlay-class'];

      const _overlayRef = _overlayService.create(_overlayConfig).attachComponent(_componentPortal);
      _viewContainerFixture.detectChanges();

      expect((_overlayContainerElement.querySelector('.ngx-Overlay') as HTMLElement).classList).toContain('custom-overlay-class');
    });

    it('should be able to apply multiple classes', () => {
      _overlayConfig.overlayClasses = ['custom-overlay-class-one', 'custom-overlay-class-two'];

      const _overlayRef = _overlayService.create(_overlayConfig).attachComponent(_componentPortal);
      _viewContainerFixture.detectChanges();

      const _overlayElement = _overlayContainerElement.querySelector('.ngx-Overlay') as HTMLElement;
      expect(_overlayElement.classList).toContain('custom-overlay-class-one');
      expect(_overlayElement.classList).toContain('custom-overlay-class-two');
    });
  });

  describe('scroll strategy', () => {
    let _overlayRef: NgxOverlayRef;
    let _fakeScrollStrategy: NgxFakeScrollStrategy;

    beforeEach(() => {
      _fakeScrollStrategy = new NgxFakeScrollStrategy();
      _overlayConfig.scrollStrategy = _fakeScrollStrategy;

      _overlayRef = _overlayService.create(_overlayConfig);
      _overlayRef.attachComponent(_componentPortal);
    });

    afterEach(() => {
      _overlayRef.dispose();
    });

    it('should attach the overlay ref to the scroll strategy', () => {
      expect(_fakeScrollStrategy.overlayRef)
      .toBe(_overlayRef, 'Expected scroll strategy to have been attached to the current overlay ref.');
    });

    it('should enable the scroll strategy when the overlay is attached', () => {
      expect(_fakeScrollStrategy.isEnabled).toBe(true, 'Expected scroll strategy to be enabled.');
    });

    it('should disable the scroll strategy once the overlay is detached', () => {
      expect(_fakeScrollStrategy.isEnabled).toBe(true, 'Expected scroll strategy to be enabled.');

      _overlayRef.detach();
      expect(_fakeScrollStrategy.isEnabled).toBe(false, 'Expected scroll strategy to be disabled.');
    });

    it('should disable the scroll strategy when the overlay is destroyed', () => {
      _overlayRef.dispose();

      expect(_fakeScrollStrategy.isEnabled).toBe(false, 'Expected scroll strategy to be disabled.');
    });
  });
});

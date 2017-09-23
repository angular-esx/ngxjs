import {
  NgModule,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  TestBed,
  async,
  inject,
} from '@angular/core/testing';

import { NgxBrowserPlatformService } from '../../../../services';
import { NgxComponentPortal } from '../../../portal';
import {
  NgxOverlayConfig,
  NgxOverlayRef,
  NgxOverlayModule,
  NgxOverlayService,
  NgxOverlayContainerService,
  NgxPositionStrategyService,
  NgxScrollStrategyService,
  NgxScrollService,
  NgxViewportService,
} from '../../../overlay';


@Component({
  template: '<p>NgxTestComponent</p>',
  styleUrls: ['../../styles/index.scss'],
  encapsulation: ViewEncapsulation.None,
})
class NgxTestComponent { }

@NgModule({
  imports: [NgxOverlayModule],
  declarations: [NgxTestComponent],
  entryComponents: [NgxTestComponent],
})
class NgxOverlayTestModule { }


describe('NgxBlockScrollStrategy', () => {
  let _forceScrollElement: HTMLElement;
  let _overlayRef: NgxOverlayRef;
  let _componentPortal: NgxComponentPortal<NgxTestComponent>;
  let _browserPlatformService: NgxBrowserPlatformService;
  let _viewportService: NgxViewportService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxOverlayTestModule],
    })
    .compileComponents();
  }));

  beforeEach(inject([
    NgxBrowserPlatformService,
    NgxOverlayContainerService,
    NgxPositionStrategyService,
    NgxScrollStrategyService,
    NgxViewportService,
    NgxOverlayService,
  ],
  (browserPlatformService: NgxBrowserPlatformService,
    overlayContainerServicer: NgxOverlayContainerService,
    positionStrategyService: NgxPositionStrategyService,
    scrollStrategyService: NgxScrollStrategyService,
    viewportService: NgxViewportService,
    overlayService: NgxOverlayService
  ) => {
    const _overlayConfig = new NgxOverlayConfig();
    _overlayConfig.container = overlayContainerServicer.createOverlayContainer();
    _overlayConfig.positionStrategy = positionStrategyService.createGlobalPositionStrategy();
    _overlayConfig.scrollStrategy = scrollStrategyService.createBlockScrollStrategy();

    _overlayRef = overlayService.create(_overlayConfig);

    _componentPortal = new NgxComponentPortal(NgxTestComponent);

    _viewportService = viewportService;
    _browserPlatformService = browserPlatformService;

    _forceScrollElement = document.createElement('div');
    _forceScrollElement.style.width = '100px';
    _forceScrollElement.style.height = '3000px';
    _forceScrollElement.style.background = 'rebeccapurple';
    document.body.appendChild(_forceScrollElement);
  }));

  afterEach(() => {
    _overlayRef.dispose();
    document.body.removeChild(_forceScrollElement);
    document.documentElement.classList.remove('ngx-OverlayScrollStrategy_type_block');

    _setScrollPosition(0, 0);
  });

  it('should toggle scroll blocking along the y axis', () => {
    _setScrollPosition(0, 100);

    expect(_viewportService.getViewportPosition().top)
    .toBe(100, 'Expected viewport to be scrollable initially.');

    _overlayRef.attachComponent(_componentPortal);
    expect(document.documentElement.style.top)
    .toBe('-100px', 'Expected <html> element to be offset by the previous scroll amount.');

    _setScrollPosition(0, 300);
    expect(_viewportService.getViewportPosition().top)
    .toBe(100, 'Expected the viewport not to scroll.');

    _overlayRef.detach();
    expect(_viewportService.getViewportPosition().top)
    .toBe(100, 'Expected old scroll position to have bee restored after disabling.');

    _setScrollPosition(0, 300);
    expect(_viewportService.getViewportPosition().top)
    .toBe(300, 'Expected user to be able to scroll after disabling.');
  });


  it('should toggle scroll blocking along the x axis', () => {
    _forceScrollElement.style.height = '100px';
    _forceScrollElement.style.width = '3000px';

    _setScrollPosition(100, 0);
    expect(_viewportService.getViewportPosition().left)
    .toBe(100, 'Expected viewport to be scrollable initially.');

    _overlayRef.attachComponent(_componentPortal);
    expect(document.documentElement.style.left)
    .toBe('-100px', 'Expected <html> element to be offset by the previous scroll amount.');

    _setScrollPosition(300, 0);
    expect(_viewportService.getViewportPosition().left)
    .toBe(100, 'Expected the viewport not to scroll.');

    _overlayRef.detach();
    expect(_viewportService.getViewportPosition().left)
    .toBe(100, 'Expected old scroll position to have bee restored after disabling.');

    _setScrollPosition(300, 0);
    expect(_viewportService.getViewportPosition().left)
    .toBe(300, 'Expected user to be able to scroll after disabling.');
  });


  it('should toggle the `ngx-OverlayScrollStrategy_type_block` class', () => {
    expect(document.documentElement.classList).not.toContain('ngx-OverlayScrollStrategy_type_block');

    _overlayRef.attachComponent(_componentPortal);
    expect(document.documentElement.classList).toContain('ngx-OverlayScrollStrategy_type_block');

    _overlayRef.detach();
    expect(document.documentElement.classList).not.toContain('ngx-OverlayScrollStrategy_type_block');
  });

  it('should restore any previously-set inline styles', () => {
    const root = document.documentElement;

    root.style.top = '13px';
    root.style.left = '37px';

    _overlayRef.attachComponent(_componentPortal);
    expect(root.style.top).not.toBe('13px');
    expect(root.style.left).not.toBe('37px');

    _overlayRef.detach();
    expect(root.style.top).toBe('13px');
    expect(root.style.left).toBe('37px');
  });

  it(`should't do anything if the page isn't scrollable`, () => {
    _forceScrollElement.style.display = 'none';

    _overlayRef.attachComponent(_componentPortal);
    expect(document.documentElement.classList).not.toContain('ngx-OverlayScrollStrategy_type_block');
  });


  it('should keep the content width', () => {
    _forceScrollElement.style.width = '100px';

    const previousContentWidth = document.documentElement.getBoundingClientRect().width;

    _overlayRef.attachComponent(_componentPortal);
    expect(document.documentElement.getBoundingClientRect().width).toBe(previousContentWidth);
  });
  /**
   * Scrolls the _viewportService.
   */
  function _setScrollPosition (x: number, y: number): void {
    window.scroll(x, y);
    _viewportService.cacheViewportRect();
  }
});

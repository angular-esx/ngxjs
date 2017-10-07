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

import {
  INgxBrowserPlatformService,
  NgxBrowserPlatformService,
} from '../../../../../services';
import { NgxComponentPortal } from '../../../../portal';
import {
  NgxOverlayConfig,
  INgxOverlayRef,
  INgxGlobalPositionStrategy,
  INgxOverlayService,
  NgxOverlayService,
  INgxOverlayContainerService,
  NgxOverlayContainerService,
  INgxPositionStrategyService,
  NgxPositionStrategyService,
  INgxScrollStrategyService,
  NgxScrollStrategyService,
  NgxOverlayModule,
} from '../../../../overlay';


@Component({
  template: '<p>NgxTestComponent</p>',
  styleUrls: ['../../../styles/index.scss'],
  encapsulation: ViewEncapsulation.None,
})
class NgxTestComponent { }


@NgModule({
  imports: [NgxOverlayModule],
  declarations: [NgxTestComponent],
  entryComponents: [NgxTestComponent],
})
class NgxOverlayTestModule { }


describe('NgxGlobalPositonStrategy', () => {
  let _overlayRef: INgxOverlayRef;
  let _strategy: INgxGlobalPositionStrategy;

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
    NgxOverlayService,
  ],
  (browserPlatformService: INgxBrowserPlatformService,
    overlayContainerServicer: INgxOverlayContainerService,
    positionStrategyService: INgxPositionStrategyService,
    scrollStrategyService: INgxScrollStrategyService,
    overlayService: INgxOverlayService
  ) => {
    _strategy = positionStrategyService.createGlobalPositionStrategy();

    const _overlayConfig = new NgxOverlayConfig();
    _overlayConfig.container = overlayContainerServicer.createOverlayContainer();
    _overlayConfig.scrollStrategy = scrollStrategyService.createNoopScrollStrategy();
    _overlayConfig.positionStrategy = _strategy;

    _overlayRef = overlayService.create(_overlayConfig);
    _overlayRef.attachComponent(new NgxComponentPortal(NgxTestComponent));
  }));

  afterEach(() => {
    _overlayRef.dispose();
  });

  it('should position the overlay to the (top, left) with an offset', () => {
    _strategy.setTop('10px').setLeft('40px').apply();

    const _overlay = _overlayRef.overlayElement;
    const _overlayStyle = _overlay.style;
    const _positionStrategyStyle = (_overlay.parentNode as HTMLElement).style;

    expect(_overlayStyle.marginTop).toBe('10px');
    expect(_overlayStyle.marginLeft).toBe('40px');
    expect(_overlayStyle.marginBottom).toBe('');
    expect(_overlayStyle.marginRight).toBe('');

    expect(_positionStrategyStyle.justifyContent).toBe('flex-start');
    expect(_positionStrategyStyle.alignItems).toBe('flex-start');
  });

  it('should position the overlay to the (bottom, right) with an offset', () => {
    _strategy.setBottom('70px').setRight('15em').apply();

    const _overlay = _overlayRef.overlayElement;
    const _overlayStyle = _overlay.style;
    const _positionStrategyStyle = (_overlay.parentNode as HTMLElement).style;

    expect(_overlayStyle.marginTop).toBe('');
    expect(_overlayStyle.marginLeft).toBe('');
    expect(_overlayStyle.marginBottom).toBe('70px');
    expect(_overlayStyle.marginRight).toBe('15em');

    expect(_positionStrategyStyle.justifyContent).toBe('flex-end');
    expect(_positionStrategyStyle.alignItems).toBe('flex-end');
  });

  it('should overwrite previously applied positioning', () => {
    _strategy.setHorizontalCenter().setVerticalCenter().apply();
    _strategy.setTop('10px').setLeft('40%').apply();

    const _overlay = _overlayRef.overlayElement;
    const _overlayStyle = _overlay.style;
    const _positionStrategyStyle = (_overlay.parentNode as HTMLElement).style;

    expect(_overlayStyle.marginTop).toBe('10px');
    expect(_overlayStyle.marginLeft).toBe('40%');
    expect(_overlayStyle.marginBottom).toBe('');
    expect(_overlayStyle.marginRight).toBe('');

    expect(_positionStrategyStyle.justifyContent).toBe('flex-start');
    expect(_positionStrategyStyle.alignItems).toBe('flex-start');

    _strategy.setBottom('70px').setRight('15em').apply();

    expect(_overlay.style.marginTop).toBe('');
    expect(_overlay.style.marginLeft).toBe('');
    expect(_overlay.style.marginBottom).toBe('70px');
    expect(_overlay.style.marginRight).toBe('15em');

    expect(_positionStrategyStyle.justifyContent).toBe('flex-end');
    expect(_positionStrategyStyle.alignItems).toBe('flex-end');
  });

  it('should center the overlay', () => {
    _strategy.setHorizontalCenter().setVerticalCenter().apply();

    const _overlay = _overlayRef.overlayElement;
    const _positionStrategyStyle = (_overlay.parentNode as HTMLElement).style;

    expect(_positionStrategyStyle.justifyContent).toBe('center');
    expect(_positionStrategyStyle.alignItems).toBe('center');
  });

  it('should center the overlay with an offset', () => {
    _strategy
    .setLeft('10px')
    .setHorizontalCenter()
    .setTop('15px')
    .setVerticalCenter()
    .apply();

    const _overlay = _overlayRef.overlayElement;
    const _overlayStyle = _overlay.style;
    const _positionStrategyStyle = (_overlay.parentNode as HTMLElement).style;

    expect(_overlayStyle.marginLeft).toBe('10px');
    expect(_overlayStyle.marginTop).toBe('15px');

    expect(_positionStrategyStyle.justifyContent).toBe('center');
    expect(_positionStrategyStyle.alignItems).toBe('center');
  });

  it('should make the overlay position: static', () => {
    _strategy.apply();

    expect(_overlayRef.overlayElement.style.position).toBe('static');
  });

  it('should wrap the overlay in a `ngx-OverlayPositionStrategy_type_global`', () => {
    _strategy.apply();

    const parent = _overlayRef.overlayElement.parentNode as HTMLElement;

    expect(parent.classList.contains('ngx-OverlayPositionStrategy_type_global')).toBe(true);
  });


  it('should remove the parent wrapper from the DOM', () => {
    _strategy.apply();

    expect(document.body.contains(_overlayRef.overlayElement.parentNode)).toBe(true);

    _strategy.dispose();

    expect(document.body.contains(_overlayRef.overlayElement.parentNode)).toBe(false);
  });

  it('should set the overlay width', () => {
    _strategy.setWidth('100px').apply();

    expect(_overlayRef.overlayElement.style.width).toBe('100px');
  });

  it('should set the overlay height', () => {
    _strategy.setHeight('100px').apply();

    expect(_overlayRef.overlayElement.style.height).toBe('100px');
  });

  it('should reset the horizontal position and offset when the width is 100%', () => {
    _strategy.setHorizontalCenter().setWidth('100%').apply();

    const _overlay = _overlayRef.overlayElement;

    expect(_overlay.style.marginLeft).toBe('0px');
    expect((_overlay.parentNode as HTMLElement).style.justifyContent).toBe('flex-start');
  });

  it('should reset the vertical position and offset when the height is 100%', () => {
    _strategy.setVerticalCenter().setHeight('100%').apply();

    const _overlay = _overlayRef.overlayElement;

    expect(_overlay.style.marginTop).toBe('0px');
    expect((_overlay.parentNode as HTMLElement).style.alignItems).toBe('flex-start');
  });
});

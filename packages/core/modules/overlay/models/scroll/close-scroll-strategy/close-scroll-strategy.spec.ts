import {
  NgModule,
  Component,
} from '@angular/core';
import {
  TestBed,
  async,
  inject,
} from '@angular/core/testing';

import { Subject } from 'rxjs/Subject';

import { NgxComponentPortal } from '../../../../portal';
import {
  NgxOverlayConfig,
  INgxOverlayRef,
  INgxOverlayService,
  NgxOverlayService,
  INgxOverlayContainerService,
  NgxOverlayContainerService,
  INgxPositionStrategyService,
  NgxPositionStrategyService,
  INgxScrollStrategyService,
  NgxScrollStrategyService,
  NgxScrollService,
  NgxOverlayModule,
} from '../../../../overlay';


@Component({
  template: '<p>NgxTestComponent</p>',
})
class NgxTestComponent { }


@NgModule({
  imports: [NgxOverlayModule],
  declarations: [NgxTestComponent],
  entryComponents: [NgxTestComponent],
})
class NgxOverlayTestModule { }


describe('NgxCloseScrollStrategy', () => {
  let _overlayRef: INgxOverlayRef;
  let _componentPortal: NgxComponentPortal<NgxTestComponent>;
  const _scrolledSubject = new Subject();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxOverlayTestModule],
      providers: [
        {
          provide: NgxScrollService, useFactory: () => {
            return { subscribe: (next: () => any, auditTime: number = 20) => {
              return _scrolledSubject.asObservable().subscribe(next);
            }};
          },
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(inject([
    NgxOverlayContainerService,
    NgxPositionStrategyService,
    NgxScrollStrategyService,
    NgxOverlayService,
  ],
  (overlayContainerServicer: INgxOverlayContainerService,
    positionStrategyService: INgxPositionStrategyService,
    scrollStrategyService: INgxScrollStrategyService,
    overlayService: INgxOverlayService
  ) => {
    const _overlayConfig = new NgxOverlayConfig();
    _overlayConfig.container = overlayContainerServicer.createOverlayContainer();
    _overlayConfig.positionStrategy = positionStrategyService.createGlobalPositionStrategy();
    _overlayConfig.scrollStrategy = scrollStrategyService.createCloseScrollStrategy();

    _overlayRef = overlayService.create(_overlayConfig);

    _componentPortal = new NgxComponentPortal(NgxTestComponent);
  }));

  afterEach(() => {
    _overlayRef.dispose();
  });

  it('should detach the overlay as soon as the user scrolls', () => {
    _overlayRef.attachComponent(_componentPortal);
    spyOn(_overlayRef, 'detach');

    _scrolledSubject.next();
    expect(_overlayRef.detach).toHaveBeenCalled();
  });

  it('should not attempt to detach the overlay after it has been detached', () => {
    _overlayRef.attachComponent(_componentPortal);
    _overlayRef.detach();

    spyOn(_overlayRef, 'detach');
    _scrolledSubject.next();

    expect(_overlayRef.detach).not.toHaveBeenCalled();
  });
});
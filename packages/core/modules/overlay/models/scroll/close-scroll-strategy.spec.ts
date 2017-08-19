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

import { NgxServiceModule } from '../../../../services';
import { NgxComponentPortal } from '../../../portal';
import {
  NgxOverlayConfig,
  NgxOverlayRef,
  NgxOverlayModule,
  NgxOverlayService,
  NgxPositionStrategyService,
  NgxScrollStrategyService,
  NgxScrollService,
} from '../../../overlay';


@Component({template: '<p>TestComponent</p>'})
class TestComponent { }


@NgModule({
  imports: [
    NgxServiceModule,
    NgxOverlayModule,
  ],
  declarations: [TestComponent],
  entryComponents: [TestComponent],
})
class NgxOverlayTestModule { }


describe('NgxCloseScrollStrategy', () => {
  let _overlayRef: NgxOverlayRef;
  let _componentPortal: NgxComponentPortal<TestComponent>;
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
    NgxPositionStrategyService,
    NgxScrollStrategyService,
    NgxOverlayService,
  ],
  (positionStrategyService: NgxPositionStrategyService,
    scrollStrategyService: NgxScrollStrategyService,
    overlayService: NgxOverlayService
  ) => {
    const _overlayConfig = new NgxOverlayConfig();
    _overlayConfig.positionStrategy = positionStrategyService.createGlobalPositionStrategy();
    _overlayConfig.scrollStrategy = scrollStrategyService.createCloseScrollStrategy();

    _overlayRef = overlayService.create(_overlayConfig);

    _componentPortal = new NgxComponentPortal(TestComponent);
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

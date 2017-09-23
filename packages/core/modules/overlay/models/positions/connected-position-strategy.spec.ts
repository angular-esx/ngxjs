import {
  NgModule,
  Component,
  ElementRef,
  ViewEncapsulation,
  NgZone,
} from '@angular/core';
import {
  TestBed,
  async,
  inject,
} from '@angular/core/testing';

import { Subscription } from 'rxjs/Subscription';

import { NgxRenderService } from '../../../../services';
import { NgxComponentPortal } from '../../../portal';
import {
  NgxOverlayConfig,
  NgxOverlayRef,
  NgxOverlayModule,
  NgxOverlayService,
  NgxOverlayContainerService,
  NgxConnectionPositionType,
  NgxConnectionPositionPairType,
  NgxConnectedOverlayPositionChangedType,
  NgxPositionStrategyService,
  INgxScrollable,
  NgxScrollStrategyService,
  NgxScrollService,
  NgxConnectedPositionStrategy,
  NgxScrollableDirective,
} from '../../../overlay';


// Default width and height of the overlay and origin panels throughout these tests.
// For all tests, we assume the browser window is 1024x786 (outerWidth x outerHeight).
// The karma config has been set to this for local tests
const DEFAULT_HEIGHT = 30;
const DEFAULT_WIDTH = 60;

@Component({
  template: `<div style="width: ${DEFAULT_WIDTH}px; height: ${DEFAULT_HEIGHT}px;">TestComponent</div>`,
  styleUrls: ['../../styles/index.scss'],
  encapsulation: ViewEncapsulation.None,
})
class TestComponent { }


@NgModule({
  imports: [NgxOverlayModule],
  declarations: [TestComponent],
  entryComponents: [TestComponent],
})
class NgxOverlayTestModule { }

/** Fake implementation of ElementRef that is just a simple container for nativeElement. */
class NgxFakeElementRef implements ElementRef {
  constructor (public nativeElement: HTMLElement) { }
}


describe('NgxConnectedPositionStrategy', () => {
  let _originElement: HTMLElement;
  let _overlayConfig: NgxOverlayConfig;
  let _componentPortal: NgxComponentPortal<TestComponent>;
  let _overlayRef: NgxOverlayRef;
  let _strategy: NgxConnectedPositionStrategy;
  let _positionStrategyService: NgxPositionStrategyService;
  let _overlayService: NgxOverlayService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxOverlayTestModule],
    })
    .compileComponents();
  }));

  beforeEach(inject([
    NgxOverlayContainerService,
    NgxScrollStrategyService,
    NgxPositionStrategyService,
    NgxOverlayService,
  ],
  (overlayContainerServicer: NgxOverlayContainerService,
    scrollStrategyService: NgxScrollStrategyService,
    positionStrategyService: NgxPositionStrategyService,
    overlayService: NgxOverlayService,
  ) => {
    _originElement = _createPositionedBlockElement();
    document.body.appendChild(_originElement);

    _overlayConfig = new NgxOverlayConfig();
    _overlayConfig.container = overlayContainerServicer.createOverlayContainer();
    _overlayConfig.scrollStrategy = scrollStrategyService.createNoopScrollStrategy();

    _positionStrategyService = positionStrategyService;
    _overlayService = overlayService;

    _componentPortal = new NgxComponentPortal(TestComponent);
  }));

  afterEach(() => {
    if (_overlayRef) {
      _overlayRef.dispose();
      _overlayRef = null;
    }
  });

  describe('with origin on document body', () => {
    const ORIGIN_HEIGHT = DEFAULT_HEIGHT;
    const ORIGIN_WIDTH = DEFAULT_WIDTH;
    const OVERLAY_HEIGHT = DEFAULT_HEIGHT;
    const OVERLAY_WIDTH = DEFAULT_WIDTH;

    let _originRect: ClientRect | null;
    let _originCenterX: number | null;
    let _originCenterY: number | null;

    afterEach(() => {
      document.body.removeChild(_originElement);

      _originRect = null;
      _originCenterX = null;
      _originCenterY = null;
    });

    describe('when not near viewport edge, not scrolled', () => {
      // Place the original element close to the center of the window.
      // (1024 / 2, 768 / 2). It's not exact, since outerWidth/Height includes browser
      // chrome, but it doesn't really matter for these tests.
      const ORIGIN_LEFT = 500;
      const ORIGIN_TOP = 350;

      beforeEach(() => {
        _originElement.style.left = `${ORIGIN_LEFT}px`;
        _originElement.style.top = `${ORIGIN_TOP}px`;

        _originRect = _originElement.getBoundingClientRect();
        _originCenterX = _originRect.left + (ORIGIN_WIDTH / 2);
        _originCenterY = _originRect.top + (ORIGIN_HEIGHT / 2);
      });

      // Preconditions are set, now just run the full set of simple position tests.
      runSimplePositionTests();
    });

    describe('when scrolled', () => {
      // Place the original element decently far outside the unscrolled document (1024x768).
      const ORIGIN_LEFT = 2500;
      const ORIGIN_TOP = 2500;

      // Create a very large element that will make the page scrollable.
      const veryLargeElement: HTMLElement = document.createElement('div');
      veryLargeElement.style.width = '4000px';
      veryLargeElement.style.height = '4000px';

      beforeEach(() => {
        // Scroll the page such that the origin element is roughly in the
        // center of the visible viewport (2500 - 1024/2, 2500 - 768/2).
        document.body.appendChild(veryLargeElement);
        document.body.scrollTop = 2100;
        document.body.scrollLeft = 2100;

        _originElement.style.top = `${ORIGIN_TOP}px`;
        _originElement.style.left = `${ORIGIN_LEFT}px`;

        _originRect = _originElement.getBoundingClientRect();
        _originCenterX = _originRect.left + (ORIGIN_WIDTH / 2);
        _originCenterY = _originRect.top + (ORIGIN_HEIGHT / 2);
      });

      afterEach(() => {
        document.body.removeChild(veryLargeElement);
        document.body.scrollTop = 0;
        document.body.scrollLeft = 0;
      });

      // Preconditions are set, now just run the full set of simple position tests.
      runSimplePositionTests();
    });

    describe('when near viewport edge', () => {
      it('should reposition the overlay if it would go off the top of the screen', () => {
        _originElement.style.top = '5px';
        _originElement.style.left = '200px';
        _originRect = _originElement.getBoundingClientRect();

        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'end', y: 'top' } as NgxConnectionPositionType,
          { x: 'end', y: 'bottom' } as NgxConnectionPositionType
        )
        .addFallbackPositions({
          origin: { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
          overlay: { x: 'start', y: 'top' } as NgxConnectionPositionType,
        } as NgxConnectionPositionPairType);

        _createOverlayRef();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.floor(_overlayRect.top)).toBe(Math.floor(_originRect.bottom));
        expect(Math.floor(_overlayRect.left)).toBe(Math.floor(_originRect.left));
      });

      it('should reposition the overlay if it would go off the left of the screen', () => {
        // We can use the real ViewportRuler in this test since we know that zero is
        // always the left edge of the viewport.
        _originElement.style.top = '200px';
        _originElement.style.left = '5px';
        _originRect = _originElement.getBoundingClientRect();
        _originCenterY = _originRect.top + (ORIGIN_HEIGHT / 2);

        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
          { x: 'end', y: 'top' } as NgxConnectionPositionType
        )
        .addFallbackPositions({
          origin: { x: 'end', y: 'center' } as NgxConnectionPositionType,
          overlay: { x: 'start', y: 'center' } as NgxConnectionPositionType,
        } as NgxConnectionPositionPairType);

        _createOverlayRef();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.floor(_overlayRect.top)).toBe(Math.floor(_originCenterY - (OVERLAY_HEIGHT / 2)));
        expect(Math.floor(_overlayRect.left)).toBe(Math.floor(_originRect.right));
      });

      it('should reposition the overlay if it would go off the bottom of the screen', () => {
        _originElement.style.bottom = '25px';
        _originElement.style.left = '200px';
        _originRect = _originElement.getBoundingClientRect();

        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
          { x: 'start', y: 'top' } as NgxConnectionPositionType
        )
        .addFallbackPositions({
          origin: { x: 'end', y: 'top' } as NgxConnectionPositionType,
          overlay: { x: 'end', y: 'bottom' } as NgxConnectionPositionType,
        } as NgxConnectionPositionPairType);

        _createOverlayRef();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.floor(_overlayRect.bottom)).toBe(Math.floor(_originRect.top));
        expect(Math.floor(_overlayRect.right)).toBe(Math.floor(_originRect.right));
      });

      it('should reposition the overlay if it would go off the right of the screen', () => {
        _originElement.style.top = '200px';
        _originElement.style.right = '25px';
        _originRect = _originElement.getBoundingClientRect();

        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'end', y: 'center' } as NgxConnectionPositionType,
          { x: 'start', y: 'center' } as NgxConnectionPositionType
        )
        .addFallbackPositions({
          origin: { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
          overlay: { x: 'end', y: 'top' } as NgxConnectionPositionType,
        } as NgxConnectionPositionPairType);

        _createOverlayRef();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.floor(_overlayRect.top)).toBe(Math.floor(_originRect.bottom));
        expect(Math.floor(_overlayRect.right)).toBe(Math.floor(_originRect.left));
      });

      it('should recalculate and set the last position with recalculateLastPosition()', () => {
        // Push the trigger down so the overlay doesn't have room to open on the bottom.
        _originElement.style.bottom = '25px';
        _originRect = _originElement.getBoundingClientRect();

        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
          { x: 'start', y: 'top' } as NgxConnectionPositionType
        )
        .addFallbackPositions({
          origin: { x: 'start', y: 'top' } as NgxConnectionPositionType,
          overlay: { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
        } as NgxConnectionPositionPairType);

        _createOverlayRef();
        // Now make the overlay small enough to fit in the first preferred position.
        _overlayRef.overlayElement.style.height = '15px';
        // This should only re-align in the last position, even though the first would fit.
        _strategy.recalculateLastPosition();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.floor(_overlayRect.bottom))
        .toBe(Math.floor(_originRect.top), 'Expected overlay to be re-aligned to the trigger in the previous position.');
      });

      it('should default to the initial position, if no positions fit in the viewport', () => {
        // Make the origin element taller than the viewport.
        _originElement.style.height = '1000px';
        _originElement.style.top = '0';
        _originRect = _originElement.getBoundingClientRect();

        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'start', y: 'top' } as NgxConnectionPositionType,
          { x: 'start', y: 'bottom' } as NgxConnectionPositionType
        );

        _createOverlayRef();

        _strategy.recalculateLastPosition();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.floor(_overlayRect.bottom))
        .toBe(Math.floor(_originRect.top), 'Expected overlay to be re-aligned to the trigger in the initial position.');
      });

      it('should position a panel properly when rtl', () => {
        _originRect = _originElement.getBoundingClientRect();

        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
          { x: 'start', y: 'top' } as NgxConnectionPositionType
        )
        .setDirection('rtl');


        _createOverlayRef();
        // must make the overlay longer than the origin to properly test attachment
        _overlayRef.overlayElement.style.width = `500px`;
        _strategy.apply();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.floor(_overlayRect.top)).toBe(Math.floor(_originRect.bottom));
        expect(Math.floor(_overlayRect.right)).toBe(Math.floor(_originRect.right));
      });

      it('should position a panel with the x offset provided', () => {
        _originRect = _originElement.getBoundingClientRect();

        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'start', y: 'top' } as NgxConnectionPositionType,
          { x: 'start', y: 'top' } as NgxConnectionPositionType
        )
        .setOffsetX(10);

        _createOverlayRef();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.floor(_overlayRect.top)).toBe(Math.floor(_originRect.top));
        expect(Math.floor(_overlayRect.left)).toBe(Math.floor(_originRect.left + 10));
      });

      it('should position a panel with the y offset provided', () => {
        _originRect = _originElement.getBoundingClientRect();

        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'start', y: 'top' } as NgxConnectionPositionType,
          { x: 'start', y: 'top' } as NgxConnectionPositionType
        )
        .setOffsetY(50);

        _createOverlayRef();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.floor(_overlayRect.top)).toBe(Math.floor(_originRect.top + 50));
        expect(Math.floor(_overlayRect.left)).toBe(Math.floor(_originRect.left));
      });

    });

    it('should emit onPositionChange event when position changes', () => {
      _originElement.style.top = '200px';
      _originElement.style.right = '25px';

      _strategy = _positionStrategyService.createConnectedPositionStrategy(
        _originElement,
        { x: 'end', y: 'center' } as NgxConnectionPositionType,
        { x: 'start', y: 'center' } as NgxConnectionPositionType
      )
      .addFallbackPositions({
        origin: { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
        overlay: { x: 'end', y: 'top' } as NgxConnectionPositionType,
      } as NgxConnectionPositionPairType);

      const positionChangeHandler = jasmine.createSpy('positionChangeHandler');
      const subscription = _strategy.positionChange$.subscribe(positionChangeHandler);

      _createOverlayRef();

      expect(positionChangeHandler).toHaveBeenCalled();

      // If the strategy is re-applied and the initial position would now fit,
      // the position change event should be emitted again.
      _originElement.style.top = '200px';
      _originElement.style.left = '200px';

      _strategy.apply();

      expect(positionChangeHandler).toHaveBeenCalledTimes(2);

      subscription.unsubscribe();
    });

    it('should emit the onPositionChange event even if none of the positions fit', () => {
      _originElement.style.bottom = '25px';
      _originElement.style.right = '25px';

      _strategy = _positionStrategyService.createConnectedPositionStrategy(
        _originElement,
        { x: 'end', y: 'bottom' } as NgxConnectionPositionType,
        { x: 'start', y: 'top' } as NgxConnectionPositionType
      )
      .addFallbackPositions({
        origin: { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
        overlay: { x: 'end', y: 'top' } as NgxConnectionPositionType,
      } as NgxConnectionPositionPairType);

      const positionChangeHandler = jasmine.createSpy('positionChangeHandler');
      const subscription = _strategy.positionChange$.subscribe(positionChangeHandler);

      _createOverlayRef();

      expect(positionChangeHandler).toHaveBeenCalled();

      subscription.unsubscribe();
    });

    it('should pick the fallback position that shows the largest area of the element', () => {
      _originElement.style.top = '200px';
      _originElement.style.right = '25px';
      _originRect = _originElement.getBoundingClientRect();

      _strategy = _positionStrategyService.createConnectedPositionStrategy(
        _originElement,
        { x: 'end', y: 'center' } as NgxConnectionPositionType,
        { x: 'start', y: 'center' } as NgxConnectionPositionType
      )
      .addFallbackPositions(
        {
          origin: { x: 'end', y: 'top' } as NgxConnectionPositionType,
          overlay: { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
        } as NgxConnectionPositionPairType,
        {
          origin: { x: 'end', y: 'top' } as NgxConnectionPositionType,
          overlay: { x: 'end', y: 'top' } as NgxConnectionPositionType,
        } as NgxConnectionPositionPairType
      );

      _createOverlayRef();

      const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
      expect(Math.floor(_overlayRect.top)).toBe(Math.floor(_originRect.top));
      expect(Math.floor(_overlayRect.left)).toBe(Math.floor(_originRect.left));
    });
    /**
     * Run all tests for connecting the overlay to the origin such that first preferred
     * position does not go off-screen. We do this because there are several cases where we
     * want to run the exact same tests with different preconditions (e.g., not scroll, scrolled,
     * different element sized, etc.).
     */
    function runSimplePositionTests (): void {
      it('should position a panel below, left-aligned', () => {
        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
          { x: 'start', y: 'top' } as NgxConnectionPositionType
        );

        _createOverlayRef();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.floor(_overlayRect.top)).toBe(Math.floor(_originRect!.bottom));
        expect(Math.floor(_overlayRect.left)).toBe(Math.floor(_originRect!.left));
      });

      it('should position to the right, center aligned vertically', () => {
        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'end', y: 'center' } as NgxConnectionPositionType,
          { x: 'start', y: 'center' } as NgxConnectionPositionType
        );

        _createOverlayRef();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();

        expect(Math.floor(_overlayRect.top)).toBe(Math.floor(_originCenterY! - (OVERLAY_HEIGHT / 2)));
        expect(Math.floor(_overlayRect.left)).toBe(Math.floor(_originRect!.right));
      });

      it('should position to the left, below', () => {
        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
          { x: 'end', y: 'top' } as NgxConnectionPositionType
        );

        _createOverlayRef();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.floor(_overlayRect.top)).toBe(Math.floor(_originRect!.bottom));
        expect(Math.round(_overlayRect.right)).toBe(Math.round(_originRect!.left));
      });

      it('should position above, right aligned', () => {
        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'end', y: 'top' } as NgxConnectionPositionType,
          { x: 'end', y: 'bottom' } as NgxConnectionPositionType
        );

        _createOverlayRef();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.round(_overlayRect.bottom)).toBe(Math.round(_originRect!.top));
        expect(Math.round(_overlayRect.right)).toBe(Math.round(_originRect!.right));
      });

      it('should position below, centered', () => {
        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'center', y: 'bottom' } as NgxConnectionPositionType,
          { x: 'center', y: 'top' } as NgxConnectionPositionType
        );

        _createOverlayRef();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.floor(_overlayRect.top)).toBe(Math.floor(_originRect!.bottom));
        expect(Math.floor(_overlayRect.left)).toBe(Math.floor(_originCenterX! - (OVERLAY_WIDTH / 2)));
      });

      it('should center the overlay on the origin', () => {
        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'center', y: 'center' } as NgxConnectionPositionType,
          { x: 'center', y: 'center' } as NgxConnectionPositionType
        );

        _createOverlayRef();

        const _overlayRect = _overlayRef.overlayElement.getBoundingClientRect();
        expect(Math.floor(_overlayRect.top)).toBe(Math.floor(_originRect!.top));
        expect(Math.floor(_overlayRect.left)).toBe(Math.floor(_originRect!.left));
      });
    }
  });

  describe('onPositionChange with scrollable view properties', () => {
    let _scrollableElement: HTMLElement;
    let _positionChangeHandler: jasmine.Spy;
    let _onPositionChangeSubscription: Subscription;
    let _positionChange: NgxConnectedOverlayPositionChangedType;

    beforeEach(inject([
      NgZone,
      NgxScrollService,
      NgxRenderService,
    ],
    (zone: NgZone,
      scrollService: NgxScrollService,
      renerService: NgxRenderService
    ) => {
      _originElement.style.margin = '0 1000px 1000px 0';

      _scrollableElement = _createOverflowContainerElement();
      document.body.appendChild(_scrollableElement);
      _scrollableElement.appendChild(_originElement);

      _strategy = _positionStrategyService.createConnectedPositionStrategy(
        _originElement,
        { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
        { x: 'start', y: 'top' } as NgxConnectionPositionType
      )
      .addScrollables(
        new NgxScrollableDirective(new NgxFakeElementRef(_scrollableElement), zone, scrollService, renerService)
      );

      _positionChangeHandler = jasmine.createSpy('positionChangeHandler');
      _onPositionChangeSubscription = _strategy.positionChange$.subscribe(_positionChangeHandler);

      _createOverlayRef();
    }));

    afterEach(() => {
      _onPositionChangeSubscription.unsubscribe();

      document.body.removeChild(_scrollableElement);
    });

    it('should not have origin or overlay clipped or out of view without scroll', () => {
      expect(_positionChangeHandler).toHaveBeenCalled();

      _positionChange = _positionChangeHandler.calls.mostRecent().args[0];
      expect(_positionChange.scrollableView).toEqual({
        isOriginClipped: false,
        isOriginOutsideView: false,
        isOverlayClipped: false,
        isOverlayOutsideView: false
      });
    });

    it('should evaluate if origin is clipped if scrolled slightly down', () => {
      // Clip the origin by 10 pixels
      _scrollableElement.scrollTop = 10;
      _strategy.apply();

      expect(_positionChangeHandler).toHaveBeenCalled();

      _positionChange = _positionChangeHandler.calls.mostRecent().args[0];
      expect(_positionChange.scrollableView).toEqual({
        isOriginClipped: true,
        isOriginOutsideView: false,
        isOverlayClipped: false,
        isOverlayOutsideView: false
      });
    });

    it('should evaluate if origin is out of view and overlay is clipped if scrolled enough', () => {
      // Origin is 30 pixels, move out of view and clip the overlay 1px
      _scrollableElement.scrollTop = 31;
      _strategy.apply();

      expect(_positionChangeHandler).toHaveBeenCalled();

      _positionChange = _positionChangeHandler.calls.mostRecent().args[0];
      expect(_positionChange.scrollableView).toEqual({
        isOriginClipped: true,
        isOriginOutsideView: true,
        isOverlayClipped: true,
        isOverlayOutsideView: false
      });
    });

    it('should evaluate the overlay and origin are both out of the view', () => {
      // Scroll by overlay height + origin height + 1px buffer
      _scrollableElement.scrollTop = 61;
      _strategy.apply();

      expect(_positionChangeHandler).toHaveBeenCalled();

      _positionChange = _positionChangeHandler.calls.mostRecent().args[0];
      expect(_positionChange.scrollableView).toEqual({
        isOriginClipped: true,
        isOriginOutsideView: true,
        isOverlayClipped: true,
        isOverlayOutsideView: true
      });
    });
  });

  describe('positioning properties', () => {
    afterEach(() => {
      document.body.removeChild(_originElement);
    });

    describe('in ltr', () => {
      it('should use `left` when positioning an element at the start', () => {
        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'start', y: 'top' } as NgxConnectionPositionType,
          { x: 'start', y: 'top' } as NgxConnectionPositionType
        );

        _createOverlayRef();

        const _overlayStyle = _overlayRef.overlayElement.style;
        expect(_overlayStyle.left).toBeTruthy();
        expect(_overlayStyle.right).toBeFalsy();
      });

      it('should use `right` when positioning an element at the end', () => {
        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'end', y: 'top' } as NgxConnectionPositionType,
          { x: 'end', y: 'top' } as NgxConnectionPositionType
        );

        _createOverlayRef();

        const _overlayStyle = _overlayRef.overlayElement.style;
        expect(_overlayStyle.right).toBeTruthy();
        expect(_overlayStyle.left).toBeFalsy();
      });

    });

    describe('in rtl', () => {
      it('should use `right` when positioning an element at the start', () => {
        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'start', y: 'top' } as NgxConnectionPositionType,
          { x: 'start', y: 'top' } as NgxConnectionPositionType
        )
        .setDirection('rtl');

        _createOverlayRef();

        const _overlayStyle = _overlayRef.overlayElement.style;
        expect(_overlayStyle.right).toBeTruthy();
        expect(_overlayStyle.left).toBeFalsy();
      });

      it('should use `left` when positioning an element at the end', () => {
        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'end', y: 'top' } as NgxConnectionPositionType,
          { x: 'end', y: 'top' } as NgxConnectionPositionType
        )
        .setDirection('rtl');

        _createOverlayRef();

        const _overlayStyle = _overlayRef.overlayElement.style;
        expect(_overlayStyle.left).toBeTruthy();
        expect(_overlayStyle.right).toBeFalsy();
      });
    });

    describe('vertical', () => {
      it('should use `top` when positioning at element along the top', () => {
        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'start', y: 'top' } as NgxConnectionPositionType,
          { x: 'start', y: 'top' } as NgxConnectionPositionType
        );

        _createOverlayRef();

        const _overlayStyle = _overlayRef.overlayElement.style;
        expect(_overlayStyle.top).toBeTruthy();
        expect(_overlayStyle.bottom).toBeFalsy();
      });

      it('should use `bottom` when positioning at element along the bottom', () => {
        _strategy = _positionStrategyService.createConnectedPositionStrategy(
          _originElement,
          { x: 'start', y: 'bottom' } as NgxConnectionPositionType,
          { x: 'start', y: 'bottom' } as NgxConnectionPositionType
        );

        _createOverlayRef();

        const _overlayStyle = _overlayRef.overlayElement.style;
        expect(_overlayStyle.bottom).toBeTruthy();
        expect(_overlayStyle.top).toBeFalsy();
      });
    });

  });

  function _createOverlayRef (): void {
    _overlayConfig.positionStrategy = _strategy;

    _overlayRef = _overlayService.create(_overlayConfig);
    _overlayRef.attachComponent(_componentPortal);
  }
  /** Creates an absolutely positioned, display: block element with a default size. */
  function _createPositionedBlockElement (): HTMLElement {
    const element = document.createElement('div');
    element.style.width = `${DEFAULT_WIDTH}px`;
    element.style.height = `${DEFAULT_HEIGHT}px`;
    element.style.backgroundColor = 'rebeccapurple';
    element.style.zIndex = '100';
    element.style.position = 'absolute';

    return element;
  }
  /** Creates an overflow container with a set height and width with margin. */
  function _createOverflowContainerElement (): HTMLElement {
    const element = document.createElement('div');
    element.style.position = 'relative';
    element.style.overflow = 'auto';
    element.style.height = '300px';
    element.style.width = '300px';
    element.style.margin = '100px';

    return element;
  }
});

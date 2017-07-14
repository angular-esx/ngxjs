export {
  NgxPointType,
  NgxOverlayPointType,
  NgxElementBoundingPositionsType,
  NgxHorizontalConnectionPositionType,
  NgxVerticalConnectionPositionType,
  NgxConnectionPositionType,
  NgxConnectionPositionPairType,
  NgxConnectedOverlayPositionChangedType,
  INgxPositionStrategy,
  NgxConnectedPositionStrategy,
  NgxGlobalPositionStrategy,
  NgxScrollableViewType,
  INgxScrollable,
  INgxScrollStrategy,
  NgxBlockScrollStrategy,
  NgxCloseScrollStrategy,
  NgxNoopScrollStrategy,
  NgxRepositionScrollStrategy,
  NgxRepositionScrollStrategyConfig,
  NGX_OVERLAY,
  NgxOverlayConfig,
  NgxConnectedOverlayConfig,
  NgxOverlayRef,
} from './models';

export {
  NgxPositionStrategyService,
  NgxScrollStrategyService,
  NgxScrollService,
  NgxViewportService,
  NgxOverlayService,
} from './services';

export { NgxScrollableDirective } from './scrollabe.directive';
export { NgxOriginOverlayDirective } from './origin-overlay.directive';
export { NgxConnectedOverlayDirective } from './connected-overlay.directive';

export { NgxOverlayModule } from './overlay.module';

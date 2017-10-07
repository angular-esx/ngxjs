import {
  NgxConnectionPositionType,
  INgxGlobalPositionStrategy,
  INgxConnectedPositionStrategy,
} from '../../models';


export interface INgxPositionStrategyService {
  createGlobalPositionStrategy (): INgxGlobalPositionStrategy;

  createConnectedPositionStrategy (
    originElement: HTMLElement,
    originPosition: NgxConnectionPositionType,
    overlayPosition: NgxConnectionPositionType
  ): INgxConnectedPositionStrategy;
}

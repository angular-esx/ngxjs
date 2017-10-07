import { Observable } from 'rxjs/Observable';

import { INgxScrollable } from '../../scroll';
import { INgxPositionStrategy } from '../position-strategy.interface';
import {
  NgxChangedConnectedOverlayPositionEventType,
  NgxConnectionPositionPairType,
} from '../positions.type';



export interface INgxConnectedPositionStrategy extends INgxPositionStrategy {
  readonly positionChange$: Observable<NgxChangedConnectedOverlayPositionEventType>;

  recalculateLastPosition (): void;

  addScrollables (...scrollables: Array<INgxScrollable>): this;

  clearScrollables (): this;

  addFallbackPositions (...positions: Array<NgxConnectionPositionPairType>): this;

  clearFallbackPositions (): this;

  setDirection (direction: 'ltr' | 'rtl'): this;

  setOffsetX (value: number): this;

  setOffsetY (value: number): this;
}

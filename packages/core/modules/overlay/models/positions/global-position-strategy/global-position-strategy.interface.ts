import { NgxOverlayRef } from '../../overlay';
import { INgxPositionStrategy } from '../position-strategy.interface';


export interface INgxGlobalPositionStrategy extends INgxPositionStrategy {
  setTop (value: string): this;

  setLeft (value: string): this;

  setBottom (value: string): this;

  setRight (value: string): this;

  setWidth (value: string): this;

  setHeight (value: string): this;

  setHorizontalCenter (): this;

  setVerticalCenter (): this;
}

import {
  INgxBlockScrollStrategy,
  INgxCloseScrollStrategy,
  INgxNoopScrollStrategy,
  INgxRepositionScrollStrategy,
  NgxRepositionScrollStrategyConfig,
} from '../../models';


export interface INgxScrollStrategyService {
  createNoopScrollStrategy (): INgxNoopScrollStrategy;

  createCloseScrollStrategy (): INgxCloseScrollStrategy;

  createBlockScrollStrategy (): INgxBlockScrollStrategy;

  createRepositionScrollStrategy (config?: NgxRepositionScrollStrategyConfig): INgxRepositionScrollStrategy;
}

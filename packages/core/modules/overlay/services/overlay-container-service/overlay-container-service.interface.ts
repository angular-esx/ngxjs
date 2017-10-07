import {
  INgxOverlayContainer,
  INgxFullscreenOverlayContainer,
} from '../../models';


export interface INgxOverlayContainerService {
  createOverlayContainer (): INgxOverlayContainer;

  createFullscreenOverlayContainer (): INgxFullscreenOverlayContainer;
}

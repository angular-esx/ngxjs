import {
  NgxOverlayConfig,
  INgxOverlayRef,
} from '../../models';


export interface INgxOverlayService {
  create (config: NgxOverlayConfig): INgxOverlayRef;
}

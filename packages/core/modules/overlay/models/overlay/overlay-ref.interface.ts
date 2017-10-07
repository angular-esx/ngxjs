import { Observable } from 'rxjs/Observable';

import { INgxPortalHost } from '../../../portal';
import { NgxOverlayConfig } from './overlay-config.class';


export interface INgxOverlayRef extends INgxPortalHost {
  readonly backdropClick$: Observable<any>;
  readonly attach$: Observable<void>;
  readonly detach$: Observable<void>;
  readonly hasAttached: boolean;
  readonly overlayElement: HTMLElement;
  config: NgxOverlayConfig;

  setDisposeFunc (func: () => void): void;
}

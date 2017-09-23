import { Subscription } from 'rxjs/Subscription';

import { INgxScrollable } from '../../models';


export interface INgxScrollService {
  register (scrollable: INgxScrollable): void;

  deregister (scrollable: INgxScrollable): void;

  subscribe (next: () => any, auditTime: number): Subscription;

  getScrollables (element: any): Array<INgxScrollable>;
}

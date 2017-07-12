import { Observable } from 'rxjs/Observable';

/**
 * An interface must be implemented by component/directive which handle scroll events.
 */
interface INgxScrollable {
  readonly nativeElement: any;
   /**
   * Returns observable that emits when a scroll event is fired on the host element.
   */
  readonly scroll$: Observable<Event>;
}


export { INgxScrollable };


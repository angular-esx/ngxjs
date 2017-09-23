import {
  Injectable,
  ElementRef,
  Optional,
  SkipSelf,
  NgZone,
  Inject,
} from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/auditTime';

import {
  INgxBrowserPlatformService,
  NgxBrowserPlatformService,
} from '../../../../services';
import { INgxScrollable } from '../../models';
import { INgxScrollService } from './scroll-service.interface';


/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
@Injectable()
class NgxScrollService implements INgxScrollService {
  /**
   * Keeps track of the amount of subscriptions to `_scrollSubject`. Used for cleaning up afterwards.
   */
  protected _scrollSubscriptionCount = 0;
  /**
   * Map of all the INgxScrollable references that are registered with the service and their scroll event subscriptions.
   */
  protected _scrollableMap: Map<INgxScrollable, Subscription> = new Map();
  /**
   * Subject for notifying that a registered INgxScrollable reference element has been scrolled.
   */
  protected _scrollSubject: Subject<void> = new Subject<void>();
  /**
   * Keeps track of the global `scroll` and `resize` subscriptions.
   */
  protected _globalSubscription: Subscription;


  constructor (
    @Inject(NgZone) protected _ngZone: NgZone,
    @Inject(NgxBrowserPlatformService) protected _browserPlatformService: INgxBrowserPlatformService
  ) {}


  /**
   * Registers a INgxScrollable with the service and listens for its scrolled events.
   * When the INgxScrollable is scrolled, the service emits the event in its scrolled observable.
   */
  register (scrollable: INgxScrollable): void {
    this._scrollableMap.set(scrollable, scrollable.scroll$.subscribe(() => this._scrollSubject.next()));
  }
  /**
   * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
   */
  deregister (scrollable: INgxScrollable): void {
    const _scrollable = this._scrollableMap.get(scrollable);

    if (_scrollable) {
      _scrollable.unsubscribe();
      this._scrollableMap.delete(scrollable);
    }
  }
  /**
   * Subscribes to an observable that emits an event whenever any of the registered INgxScrollable
   * references (or window, document, or body) fire a scrolled event.
   * Can provide a time in ms to override the default "throttle" time.
   */
  subscribe (next: () => any, auditTime: number = 20): Subscription {
    if (!this._browserPlatformService.isBrowser) {
      return Subscription.EMPTY;
    }

    if (!this._globalSubscription) {
      this._globalSubscription = this._ngZone.runOutsideAngular(() => {
        return Observable.merge(
          Observable.fromEvent(this._browserPlatformService.document, 'scroll'),
          Observable.fromEvent(this._browserPlatformService.window, 'resize')
        ).subscribe(() => this._scrollSubject.next());
      });
    }

    const _observable = auditTime > 0
      ? this._scrollSubject.asObservable().auditTime(auditTime)
      : this._scrollSubject.asObservable();

    this._scrollSubscriptionCount++;

    const subscription = _observable.subscribe(next);
    subscription.add(() => {
      this._scrollSubscriptionCount--;

      if (this._globalSubscription && !this._scrollableMap.size && !this._scrollSubscriptionCount) {
        this._globalSubscription.unsubscribe();
        this._globalSubscription = null;
      }
    });

    return subscription;
  }
  /**
   * Returns all registered INgxScrollable that contain the provided element.
   */
  getScrollables (element: any): Array<INgxScrollable> {
    const scrollabes: Array<INgxScrollable> = [];

    this._scrollableMap.forEach((subscription, scrollable) => {
      if (this._hasAttachedScrollableToElement(scrollable, element)) {
        scrollabes.push(scrollable);
      }
    });

    return scrollabes;
  }

  protected _hasAttachedScrollableToElement (scrollable: INgxScrollable, element: any): boolean {
    let _element = element;

     do {
      if (_element === scrollable.nativeElement) { return true; }

      _element = _element.parentElement;
    }
    while (_element);

    return false;
  }
}

function ngxScrollFactory (
  parentScrollService: INgxScrollService,
  ngZone: NgZone,
  browserPlatformService: NgxBrowserPlatformService
) {
  return parentScrollService || new NgxScrollService(ngZone, browserPlatformService);
}


export {
  NgxScrollService,
  ngxScrollFactory,
};
/**
 * If there is already a NgxScrollService available, use that. Otherwise, provide a new one.
 */
export const ngxScrollProvider = {
  provide: NgxScrollService,
  deps: [[new Optional(), new SkipSelf(), NgxScrollService], NgZone, NgxBrowserPlatformService],
  useFactory: ngxScrollFactory,
};

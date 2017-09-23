import {
  Directive,
  OnInit,
  OnDestroy,
  ElementRef,
  NgZone,
  Inject,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/share';

import {
  INgxRenderer,
  INgxRenderService,
  NgxRenderService,
 } from '../../services';
import { INgxScrollable } from './models';
import {
  INgxScrollService,
  NgxScrollService,
} from './services';


/**
 * Sends an event when the directive's element is scrolled.
 * Registers itself with the NgxScrollService to include itself as part of its collection of scrolling events
 * that it can be listened to through the service.
 */
@Directive({
  selector: '[ngxScrollable]',
  exportAs: 'ngxScrollable',
})
export class NgxScrollableDirective implements INgxScrollable, OnInit, OnDestroy {
  protected _renderer: INgxRenderer;
  protected _scrollListener: Function | null;

  protected _scrollSubject = new Subject<Event>();

  readonly scroll$ = this._scrollSubject.asObservable().share();

  get nativeElement(): any {
    return this._elementRef.nativeElement;
  }


  constructor (
    @Inject(ElementRef) protected _elementRef: ElementRef,
    @Inject(NgZone) protected _ngZone: NgZone,
    @Inject(NgxScrollService) protected _scrollService: INgxScrollService,
    @Inject(NgxRenderService) renderService: INgxRenderService,
  ) {
    this._renderer = renderService.createRenderer(this.nativeElement);
  }


  ngOnInit (): void {
    this._scrollListener = this._ngZone.runOutsideAngular(() => {
      return this._renderer.listen('scroll', (event: Event) => {
        this._scrollSubject.next(event);
      });
    });

    this._scrollService.register(this);
  }

  ngOnDestroy (): void {
    this._scrollService.deregister(this);

    if (this._scrollListener) {
      this._scrollListener();
      this._scrollListener = null;
    }
  }
}

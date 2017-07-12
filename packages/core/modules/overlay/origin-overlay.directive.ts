import {
  Directive,
  ElementRef,
  Inject,
} from '@angular/core';


/**
 * Directive applied to an element to make it usable as an origin
 * for an NgxOverlay using a NgxConnectedPositionStrategy.
 */
@Directive({
  selector: '[ngxOverlayOrigin]',
  exportAs: 'ngxOriginOverlay',
})
class NgxOriginOverlayDirective {
  get nativeElement(): any {
    return this._elementRef.nativeElement;
  }

  constructor (@Inject(ElementRef) protected _elementRef) { }
}


export { NgxOriginOverlayDirective };

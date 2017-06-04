import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { NgxRendererService } from '../renderer';

@Component({
  selector: 'ngx-row',
  template: '<ng-content select="ngx-col"></ng-content>',
  host: {
    '[class.ngx-Grid__GridRow]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
class NgxGridRowComponent implements OnChanges {
  @Input() type: 'no-gutters' | null;

  @Input() verticalAlign:
    'xs-start' | 'xs-center' | 'xs-end' |
    'sm-start' | 'sm-center' | 'sm-end' |
    'md-start' | 'md-center' | 'md-end' |
    'lg-start' | 'lg-center' | 'lg-end' |
    'xl-start' | 'xl-center' | 'xl-end';

  @Input() horizontalAlign:
    'xs-start' | 'xs-center' | 'xs-end' | 'xs-around' | 'xs-between' |
    'sm-start' | 'sm-center' | 'sm-end' | 'sm-around' | 'sm-between' |
    'md-start' | 'md-center' | 'md-end' | 'md-around' | 'md-between' |
    'lg-start' | 'lg-center' | 'lg-end' | 'lg-around' | 'lg-between' |
    'xl-start' | 'xl-center' | 'xl-end' | 'xl-around' | 'xl-between';

  constructor(@Inject(ElementRef) private _elementRef, @Inject(NgxRendererService) private _renderer) { }

  ngOnChanges(changes: SimpleChanges) {
    Object.keys(changes).map((input) => {
      this._renderer.replaceClass(this._elementRef.nativeElement, 'GridRow', input, changes[input].previousValue, changes[input].currentValue, 'ngx-Grid__');
    });
  }
}


export { NgxGridRowComponent };

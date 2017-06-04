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

import { NgxRendererService } from '../../services';


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
  private get _nativeElement(): any {
    return this._elementRef.nativeElement;
  }

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


  constructor (
    @Inject(ElementRef) private _elementRef: ElementRef,
    @Inject(NgxRendererService) private _renderer: NgxRendererService
  ) { }


  ngOnChanges (changes: SimpleChanges) {
    this._renderer.changeClass(
      this._elementRef.nativeElement,
      changes,
      (propName, change) => change.previousValue.split(' ').map(value => this._getClass(propName, value)),
      (propName, change) => change.currentValue.split(' ').map(value => this._getClass(propName, value)),
    );
  }

  private _getClass (propName: string, value: any): string {
    return  propName && value ? `ngx-Grid__GridRow_${propName}_${value}` : '';
  }
}


export { NgxGridRowComponent };

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
  selector: 'ngx-col',
  template: '<ng-content></ng-content>',
  host: {
    '[class.ngx-Grid__GridColumn]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxGridColumnComponent implements OnChanges {
  @Input() align:
    'xs-start' | 'xs-center' | 'xs-end' |
    'sm-start' | 'sm-center' | 'sm-end' |
    'md-start' | 'md-center' | 'md-end' |
    'lg-start' | 'lg-center' | 'lg-end' |
    'xl-start' | 'xl-center' | 'xl-end';

  @Input() size:
    'xs-1' | 'xs-2' | 'xs-3' | 'xs-4' | 'xs-5' | 'xs-6' | 'xs-7' | 'xs-8' | 'xs-9' | 'xs-10' | 'xs-11' | 'xs-12' |
    'sm-1' | 'sm-2' | 'sm-3' | 'sm-4' | 'sm-5' | 'sm-6' | 'sm-7' | 'sm-8' | 'sm-9' | 'sm-10' | 'sm-11' | 'sm-12' |
    'md-1' | 'md-2' | 'md-3' | 'md-4' | 'md-5' | 'md-6' | 'md-7' | 'md-8' | 'md-9' | 'md-10' | 'md-11' | 'md-12' |
    'lg-1' | 'lg-2' | 'lg-3' | 'lg-4' | 'lg-5' | 'lg-6' | 'lg-7' | 'lg-8' | 'lg-9' | 'lg-10' | 'lg-11' | 'lg-12' |
    'xl-1' | 'xl-2' | 'xl-3' | 'xl-4' | 'xl-5' | 'xl-6' | 'xl-7' | 'xl-8' | 'xl-9' | 'xl-10' | 'xl-11' | 'xl-12';

  @Input() order:
    'xs-1' | 'xs-2' | 'xs-3' | 'xs-4' | 'xs-5' | 'xs-6' | 'xs-7' | 'xs-8' | 'xs-9' | 'xs-10' | 'xs-11' | 'xs-12' |
    'sm-1' | 'sm-2' | 'sm-3' | 'sm-4' | 'sm-5' | 'sm-6' | 'sm-7' | 'sm-8' | 'sm-9' | 'sm-10' | 'sm-11' | 'sm-12' |
    'md-1' | 'md-2' | 'md-3' | 'md-4' | 'md-5' | 'md-6' | 'md-7' | 'md-8' | 'md-9' | 'md-10' | 'md-11' | 'md-12' |
    'lg-1' | 'lg-2' | 'lg-3' | 'lg-4' | 'lg-5' | 'lg-6' | 'lg-7' | 'lg-8' | 'lg-9' | 'lg-10' | 'lg-11' | 'lg-12' |
    'xl-1' | 'xl-2' | 'xl-3' | 'xl-4' | 'xl-5' | 'xl-6' | 'xl-7' | 'xl-8' | 'xl-9' | 'xl-10' | 'xl-11' | 'xl-12';

  @Input() offset:
    'xs-1' | 'xs-2' | 'xs-3' | 'xs-4' | 'xs-5' | 'xs-6' | 'xs-7' | 'xs-8' | 'xs-9' | 'xs-10' | 'xs-11' |
    'sm-1' | 'sm-2' | 'sm-3' | 'sm-4' | 'sm-5' | 'sm-6' | 'sm-7' | 'sm-8' | 'sm-9' | 'sm-10' | 'sm-11' |
    'md-1' | 'md-2' | 'md-3' | 'md-4' | 'md-5' | 'md-6' | 'md-7' | 'md-8' | 'md-9' | 'md-10' | 'md-11' |
    'lg-1' | 'lg-2' | 'lg-3' | 'lg-4' | 'lg-5' | 'lg-6' | 'lg-7' | 'lg-8' | 'lg-9' | 'lg-10' | 'lg-11' |
    'xl-1' | 'xl-2' | 'xl-3' | 'xl-4' | 'xl-5' | 'xl-6' | 'xl-7' | 'xl-8' | 'xl-9' | 'xl-10' | 'xl-11';

  @Input() pull:
    'xs-0' | 'xs-1' | 'xs-2' | 'xs-3' | 'xs-4' | 'xs-5' | 'xs-6' | 'xs-7' | 'xs-8' | 'xs-9' | 'xs-10' | 'xs-11' | 'xs-12' |
    'sm-0' | 'sm-1' | 'sm-2' | 'sm-3' | 'sm-4' | 'sm-5' | 'sm-6' | 'sm-7' | 'sm-8' | 'sm-9' | 'sm-10' | 'sm-11' | 'sm-12' |
    'md-0' | 'md-1' | 'md-2' | 'md-3' | 'md-4' | 'md-5' | 'md-6' | 'md-7' | 'md-8' | 'md-9' | 'md-10' | 'md-11' | 'md-12' |
    'lg-0' | 'lg-1' | 'lg-2' | 'lg-3' | 'lg-4' | 'lg-5' | 'lg-6' | 'lg-7' | 'lg-8' | 'lg-9' | 'lg-10' | 'lg-11' | 'lg-12' |
    'xl-0' | 'xl-1' | 'xl-2' | 'xl-3' | 'xl-4' | 'xl-5' | 'xl-6' | 'xl-7' | 'xl-8' | 'xl-9' | 'xl-10' | 'xl-11' | 'xl-12';

  @Input() push:
    'xs-0' | 'xs-1' | 'xs-2' | 'xs-3' | 'xs-4' | 'xs-5' | 'xs-6' | 'xs-7' | 'xs-8' | 'xs-9' | 'xs-10' | 'xs-11' | 'xs-12' |
    'sm-0' | 'sm-1' | 'sm-2' | 'sm-3' | 'sm-4' | 'sm-5' | 'sm-6' | 'sm-7' | 'sm-8' | 'sm-9' | 'sm-10' | 'sm-11' | 'sm-12' |
    'md-0' | 'md-1' | 'md-2' | 'md-3' | 'md-4' | 'md-5' | 'md-6' | 'md-7' | 'md-8' | 'md-9' | 'md-10' | 'md-11' | 'md-12' |
    'lg-0' | 'lg-1' | 'lg-2' | 'lg-3' | 'lg-4' | 'lg-5' | 'lg-6' | 'lg-7' | 'lg-8' | 'lg-9' | 'lg-10' | 'lg-11' | 'lg-12' |
    'xl-0' | 'xl-1' | 'xl-2' | 'xl-3' | 'xl-4' | 'xl-5' | 'xl-6' | 'xl-7' | 'xl-8' | 'xl-9' | 'xl-10' | 'xl-11' | 'xl-12';


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
    return  propName && value ? `ngx-Grid__GridColumn_${propName}_${value}` : '';
  }
}


export { NgxGridColumnComponent };

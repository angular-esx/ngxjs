import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  ElementRef,
  Inject,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

import { NgxRenderService } from '../../services';


@Component({
  selector: 'ngx-sidenav-content',
  template: '<ng-content></ng-content>',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-SidenavContent]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxSidenavContentComponent implements OnChanges {
  @Input() mode: Array<string> | string;

  constructor (
    @Inject(ElementRef) private _elementRef: ElementRef,
    @Inject(NgxRenderService) private _renderer: NgxRenderService
  ) { }

  ngOnChanges (changes: SimpleChanges) {
    this._renderer.changeClass(
      this._elementRef.nativeElement,
      changes,
      (propName, change) => change.previousValue.map(value => this._getClass(propName, value)),
      (propName, change) => change.currentValue.map(value => this._getClass(propName, value)),
    );
  }

  private _getClass (propName: string, value: any): string {
    return propName && value ? `ngx-SidenavContent_${propName}_${value}` : '';
  }
}


export { NgxSidenavContentComponent };

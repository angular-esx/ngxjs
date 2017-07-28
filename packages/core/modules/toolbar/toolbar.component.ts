import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  OnChanges,
  ElementRef,
  SimpleChanges,
  Inject,
} from '@angular/core';

import { NgxRenderService, NgxRenderer } from '../../services';;

@Component({
  selector: 'ngx-toolbar',
  template: '<ng-content></ng-content>',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-Toolbar]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'ngxToolbar',
})
class NgxToolbarComponent implements OnChanges {
  private _renderer: NgxRenderer;

  @Input('variant') variant: 'primary' | 'accent' | 'warn' | string;

  constructor (
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(NgxRenderService) rendererService: NgxRenderService
  ) {
    this._renderer = rendererService.createRenderer(elementRef.nativeElement);
  }


  ngOnChanges (changes: SimpleChanges) {
    this._renderer.changeClass(
      changes,
      (propName, change) => change.previousValue.split(' ').map(value => this._getClass(propName, value)),
      (propName, change) => change.currentValue.split(' ').map(value => this._getClass(propName, value)),
    );
  }

  private _getClass (propName: string, value: any): string {
    return  propName && value ? `ngx-Toolbar_${propName}_${value}` : '';
  }
}


export { NgxToolbarComponent };

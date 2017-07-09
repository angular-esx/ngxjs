import {
  Directive,
  OnChanges,
  Input,
  ElementRef,
  SimpleChanges,
  Inject,
} from '@angular/core';

import { isObject } from 'ngx-infrastructure';

import { NgxRenderService, NgxRenderer } from '../../services';
import { NgxTypographyOptionType } from './models';

@Directive({
  selector: '[ngxTypo]',
})
class NgxTypographyDirective implements OnChanges {
  private _renderer: NgxRenderer;

  @Input('ngxTypo') options: NgxTypographyOptionType | string;

  constructor (
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(NgxRenderService) rendererService: NgxRenderService
  ) {

    this._renderer = rendererService.createRenderer(elementRef.nativeElement);

  }

  ngOnChanges (changes: SimpleChanges) {
    this._renderer.changeClass(
      changes,
      (propName, change) => this._getClass(propName, change.previousValue),
      (propName, change) => this._getClass(propName, change.currentValue),
    );
  }

  private _getClass (propName: string, options: NgxTypographyOptionType | string): string {
    if (!propName || !options) { return ''; }

    if (isObject(options)) {
      const _propName = propName.split('.').pop();

      return `ngxTypo_${_propName}_${options[_propName]}`;
    }
    else {
      return `ngxTypo_type_${options}`;
    }
  }
}


export { NgxTypographyDirective };

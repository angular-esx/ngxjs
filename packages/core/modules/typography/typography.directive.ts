import {
  Directive,
  OnChanges,
  Input,
  ElementRef,
  SimpleChanges,
  Inject,
} from '@angular/core';

import { isObject } from 'ngx-infrastructure';

import { NgxRenderService } from '../../services';
import { NgxTypographyOptionType } from './models';

@Directive({
  selector: '[ngxTypo]',
})
class NgxTypographyDirective implements OnChanges {
  @Input('ngxTypo') options: NgxTypographyOptionType | string;


  constructor (
    @Inject(ElementRef) private _elementRef: ElementRef,
    @Inject(NgxRenderService) private _rendererService: NgxRenderService
  ) {}


  ngOnChanges (changes: SimpleChanges) {
    this._rendererService.changeClass(
      this._elementRef.nativeElement,
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

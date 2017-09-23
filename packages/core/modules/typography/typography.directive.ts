import {
  Directive,
  OnChanges,
  Input,
  ElementRef,
  SimpleChanges,
  Inject,
} from '@angular/core';

import { isObject } from 'ngx-infrastructure';

import {
  INgxRenderer,
  INgxRenderService,
  NgxRenderService,
} from '../../services';
import { NgxTypographyConfig } from './models';


@Directive({
  selector: '[ngxTypo]',
  exportAs: 'ngxTypo',
})
class NgxTypographyDirective implements OnChanges {
  protected _renderer: INgxRenderer;

  @Input('ngxTypo') options: NgxTypographyConfig | string;

  constructor (
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(NgxRenderService) rendererService: INgxRenderService
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

  protected _getClass (propName: string, options: NgxTypographyConfig | string): string {
    if (!propName || !options) { return ''; }

    if (isObject(options)) {
      const _propName = propName.split('.').pop();

      return `ngx-Typography_${_propName}_${options[_propName]}`;
    }
    else {
      return `ngx-Typography_type_${options}`;
    }
  }
}


export { NgxTypographyDirective };

import { Injectable, Inject, RendererFactory2, Renderer2 } from '@angular/core';

import { isArray } from 'ngx-infrastructure';


@Injectable()
export class NgxRendererService {
  private _renderer: Renderer2;

  constructor(@Inject(RendererFactory2) rendererFactory) {
      this._renderer = rendererFactory.createRenderer(null, null);
  }

  replaceClass(element: any, component: string, attribute: string, oldValue: string, newValue: string, prefix: string = 'ngx-') {
    if(oldValue){
      let oldValues: string[] = oldValue.split(' ');

      oldValues.forEach((value) => {
        this._renderer.removeClass(element, `${prefix}${component}_${attribute}_${value}`);
      });
    }

    if(newValue) {
      let newValues: string[] = newValue.split(' ');

      newValues.forEach((value) => {
        this._renderer.addClass(element, `${prefix}${component}_${attribute}_${value}`);
      });
    }
  }

  addClass(element: any, component: string, attribute: string, value: string, prefix: string = 'ngx-') {
    let values: string[] = value.split(' ');

    values.forEach((value) => {
      this._renderer.addClass(element, `${prefix}${component}_${attribute}_${value}`);
    });
  }

  removeClass(element: any, component: string, attribute: string, value: string, prefix: string = 'ngx-') {
    let values: string[] = value.split(' ');

    values.forEach((value) => {
      this._renderer.removeClass(element, `${prefix}${component}_${attribute}_${value}`);
    });
  }
}

import {
  RendererFactory2,
  Renderer2,
  Injectable,
  Inject,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';

import { isArray } from 'ngx-infrastructure';


@Injectable()
class NgxRendererService {
  private _renderer: Renderer2;

  constructor (@Inject(RendererFactory2) rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }


  addClass (element: any, className: string | Array<string>): NgxRendererService {
    if (!className){ return; }

    if (isArray(className)) {
      (className as Array<string>).forEach(item => {
        if (item) { this._renderer.addClass(element, item); }
      });
    }
    else {
      this._renderer.addClass(element, className as string);
    }

    return this;
  }

  removeClass (element: any, className: string | Array<string>): NgxRendererService {
    if (!className){ return; }

    if (isArray(className)) {
      (className as Array<string>).forEach(item => {
        if (item) { this._renderer.removeClass(element, item); }
      });
    }
    else {
      this._renderer.removeClass(element, className as string);
    }

    return this;
  }

  changeClass (
    element: any,
    changes: SimpleChanges,
    onRemoveClass: (propName: string, change: SimpleChange) => (string | Array<string>),
    onAddCLass: (propName: string, change: SimpleChange) => (string | Array<string>)
  ): NgxRendererService {
    if (!changes) { return; }

    let _simpleChange: SimpleChange;

    Object.keys(changes).forEach(propName => {
      _simpleChange = changes[propName];

      if (onRemoveClass && _simpleChange.previousValue) {
        this.removeClass(element, onRemoveClass(propName, _simpleChange));
      }
      if (onAddCLass && _simpleChange.currentValue) {
        this.addClass(element, onAddCLass(propName, _simpleChange));
      }
    });

    return this;
  }
}


export { NgxRendererService };

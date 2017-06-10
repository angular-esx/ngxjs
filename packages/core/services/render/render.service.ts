import {
  RendererFactory2,
  Renderer2,
  Injectable,
  Inject,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';

import {
  isArray,
  isObject,
} from 'ngx-infrastructure';


@Injectable()
class NgxRenderService {
  private _renderer: Renderer2;

  constructor (@Inject(RendererFactory2) rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }


  addClass (element: any, className: string | Array<string>): NgxRenderService {
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

  removeClass (element: any, className: string | Array<string>): NgxRenderService {
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
  ): NgxRenderService {
    if (!changes) { return; }

    let _simpleChange: SimpleChange;

    Object.keys(changes).forEach(propName => {
      _simpleChange = changes[propName];

      if (onRemoveClass && _simpleChange.previousValue) {
        if (isObject(_simpleChange.previousValue)) {
          Object.keys(_simpleChange.previousValue).forEach(simpleChangePropName => {
            this.removeClass(element, onRemoveClass(`${propName}.${simpleChangePropName}`, _simpleChange));
          });
        }
        else {
          this.removeClass(element, onRemoveClass(propName, _simpleChange));
        }
      }
      if (onAddCLass && _simpleChange.currentValue) {
        if (isObject(_simpleChange.currentValue)) {
          Object.keys(_simpleChange.currentValue).forEach(simpleChangePropName => {
            this.addClass(element, onAddCLass(`${propName}.${simpleChangePropName}`, _simpleChange));
          });
        }
        else {
          this.addClass(element, onAddCLass(propName, _simpleChange));
        }
      }
    });

    return this;
  }
}


export { NgxRenderService };

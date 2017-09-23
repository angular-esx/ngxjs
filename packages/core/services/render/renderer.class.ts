import {
  RendererFactory2,
  Renderer2,
  RendererStyleFlags2,
  Injectable,
  Inject,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';

import {
  isArray,
  isObject,
} from 'ngx-infrastructure';

import { INgxRenderer } from './renderer.interface';


export class NgxRenderer implements INgxRenderer {
  get data(): { [key: string]: any } {
    return this._renderer.data;
  }

  get destroyNode(): ((node: any) => void) | null {
    return this._renderer.destroyNode;
  }

  constructor (protected _nativeElement: any, protected _renderer: Renderer2) {}


  addClass (className: string | Array<string>): this {
    if (!className) { return; }

    if (isArray(className)) {
      (className as Array<string>).forEach(item => {
        if (item) { this._renderer.addClass(this._nativeElement, item); }
      });
    }
    else {
      this._renderer.addClass(this._nativeElement, className as string);
    }

    return this;
  }

  removeClass (className: string | Array<string>): this {
    if (!className) { return; }

    if (isArray(className)) {
      (className as Array<string>).forEach(item => {
        if (item) { this._renderer.removeClass(this._nativeElement, item); }
      });
    }
    else {
      this._renderer.removeClass(this._nativeElement, className as string);
    }

    return this;
  }

  changeClass (
    changes: SimpleChanges,
    onRemoveClass: (propName: string, change: SimpleChange) => (string | Array<string>),
    onAddCLass: (propName: string, change: SimpleChange) => (string | Array<string>)
  ): this {
    if (!changes) { return; }

    let _simpleChange: SimpleChange;

    Object.keys(changes).forEach(propName => {
      _simpleChange = changes[propName];

      if (onRemoveClass && _simpleChange.previousValue) {
        if (isObject(_simpleChange.previousValue)) {
          Object.keys(_simpleChange.previousValue).forEach(simpleChangePropName => {
            this.removeClass(onRemoveClass(`${propName}.${simpleChangePropName}`, _simpleChange));
          });
        }
        else {
          this.removeClass(onRemoveClass(propName, _simpleChange));
        }
      }
      if (onAddCLass && _simpleChange.currentValue) {
        if (isObject(_simpleChange.currentValue)) {
          Object.keys(_simpleChange.currentValue).forEach(simpleChangePropName => {
            this.addClass(onAddCLass(`${propName}.${simpleChangePropName}`, _simpleChange));
          });
        }
        else {
          this.addClass(onAddCLass(propName, _simpleChange));
        }
      }
    });

    return this;
  }

  listen (
    eventName: string,
    callback: (event: any) => boolean | void
  ): () => void {
    return this._renderer.listen(this._nativeElement, eventName, callback);
  }

  /**
   * Enhance Renderer2
   */
  destroy (): void {
    return this._renderer.destroy();
  }

  createElement (name: string, namespace?: string | null): any {
    return this._renderer.createElement(name, namespace);
  }

  createComment (value: string): any {
    return this._renderer.createComment(value);
  }

  createText (value: string): any {
    return this._renderer.createText(value);
  }

  appendChild (parent: any, newChild: any): this {
    this._renderer.appendChild(parent, newChild);

    return this;
  }

  insertBefore (parent: any, newChild: any, refChild: any): this {
    this._renderer.insertBefore(parent, newChild, refChild);

    return this;
  }

  removeChild (parent: any, oldChild: any): this {
    this._renderer.removeChild(parent, oldChild);

    return this;
  }

  selectRootElement (selectorOrNode: string | any): any {
    return this._renderer.selectRootElement(selectorOrNode);
  }

  parentNode (node: any): any {
    return this._renderer.parentNode(node);
  }

  nextSibling (node: any): any {
    return this._renderer.nextSibling(node);
  }

  setAttribute (name: string, value: string, namespace?: string | null): this {
    this._renderer.setAttribute(this._nativeElement, name, value, namespace);

    return this;
  }

  removeAttribute (name: string, namespace?: string | null): this {
    this._renderer.removeAttribute(this._nativeElement, name, namespace);

    return this;
  }

  setStyle (style: string, value: any, flags?: RendererStyleFlags2): this {
    this._renderer.setStyle(this._nativeElement, style, value, flags);

    return this;
  }

  removeStyle (style: string, flags?: RendererStyleFlags2): this {
    this._renderer.removeStyle(this._nativeElement, style, flags);

    return this;
  }

  setProperty (name: string, value: any): this {
    this._renderer.setProperty(this._nativeElement, name, value);

    return this;
  }

  setValue (node: any, value: string): this {
    this._renderer.setValue(node, value);

    return this;
  }
}

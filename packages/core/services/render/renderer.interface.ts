import {
  SimpleChanges,
  SimpleChange,
  RendererStyleFlags2,
} from '@angular/core';


export interface INgxRenderer {
  readonly data: { [key: string]: any };
  readonly destroyNode: ((node: any) => void) | null;

  addClass (className: string | Array<string>): this;

  removeClass (className: string | Array<string>): this;

  changeClass (
    changes: SimpleChanges,
    onRemoveClass: (propName: string, change: SimpleChange) => (string | Array<string>),
    onAddCLass: (propName: string, change: SimpleChange) => (string | Array<string>)
  ): this;

  listen (
    eventName: string,
    callback: (event: any) => boolean | void
  ): () => void;

  destroy (): void;

  createElement (name: string, namespace?: string | null): any;

  createComment (value: string): any;

  createText (value: string): any;

  appendChild (parent: any, newChild: any): this;

  insertBefore (parent: any, newChild: any, refChild: any): this;

  removeChild (parent: any, oldChild: any): this;

  selectRootElement (selectorOrNode: string | any): any;

  parentNode (node: any): any;

  nextSibling (node: any): any;

  setAttribute (name: string, value: string, namespace?: string | null): this;

  removeAttribute (name: string, namespace?: string | null): this;

  setStyle (style: string, value: any, flags?: RendererStyleFlags2): this;

  removeStyle (style: string, flags?: RendererStyleFlags2): this;

  setProperty (name: string, value: any): this;

  setValue (node: any, value: string): this;
}

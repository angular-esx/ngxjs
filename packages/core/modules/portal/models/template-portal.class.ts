import {
  ElementRef,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { isNull } from 'ngx-infrastructure';

import {
  INgxPortalHost,
  INgxTemplatePortal,
} from './portal.interface';

import { NgxBasePortal } from './base-portal.class';


class NgxTemplatePortal
  extends NgxBasePortal
  implements INgxTemplatePortal
{
  get elementRef(): ElementRef {
    return this.templateRef.elementRef;
  }

  /**
   * Additional locals for the instantiated embedded view.
   * These locals can be seen as "exports" for the template, such as how ngFor has
   * index / event / odd.
   * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
   */
  private _locals: Map<string, any> = new Map<string, any>();
  get locals(): Map<string, any> {
    return this._locals;
  }

  /*
    template: The embedded template that will be used to instantiate an embedded View in the host.
    viewContainerRef: Reference to the ViewContainer into which the template will be stamped out.
  */
  constructor (public templateRef: TemplateRef<any>, public viewContainerRef: ViewContainerRef) {
    super();
  }

  attach (host: INgxPortalHost, locals?: Map<string, any>): Map<string, any> {
    this._locals = isNull(locals) ? new Map<string, any>() : locals;

    return super.attach(host);
  }

  detach (): void {
    this._locals = new Map<string, any>();
    return super.detach();
  }

  protected _attach (host: INgxPortalHost): any {
    return host.attachTemplate(this);
  }
}


export { NgxTemplatePortal };

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


class NgxTemplatePortal<T>
  extends NgxBasePortal
  implements INgxTemplatePortal<T>
{
  get templateRef(): TemplateRef<any> {
    return this._templateRef;
  }

  get viewContainerRef(): ViewContainerRef {
    return this._viewContainerRef;
  }

  get context(): T {
    return this._context;
  }

  /**
   * template: The embedded template that will be used to instantiate an embedded View in the host.
   * viewContainerRef: Reference to the ViewContainer into which the template will be stamped out.
   */
  constructor (
    protected _templateRef: TemplateRef<any>,
    protected _viewContainerRef: ViewContainerRef,
    protected _context?: T
  ) {
    super();
  }

  attach (host: INgxPortalHost, context?: T | undefined): T {
    if (context) { this._context = context; }

    return super.attach(host);
  }

  detach (): void {
    this._context = undefined;

    return super.detach();
  }

  protected _attach (host: INgxPortalHost): any {
    return host.attachTemplate(this);
  }
}


export { NgxTemplatePortal };

import {
  ComponentRef,
  ViewContainerRef,
  Injector,
  Type,
} from '@angular/core';

import {
  INgxPortalHost,
  INgxComponentPortal,
} from './portal.interface';
import { NgxBasePortal } from './base-portal.class';


class NgxComponentPortal<T>
  extends NgxBasePortal
  implements INgxComponentPortal<T>
{
  /*
    - component: The type of the component that will be instantiated for attachment.
    - viewContainerRef: [Optional] Where the attached component should live in Angular's *logical* component tree.
    This is different from where the component *renders*, which is determined by the NgxPortalHost.
    The origin necessary when the host is outside of the Angular application context.
    - injector: [Optional] Injector used for the instantiation of the component.
  */
  constructor (
      public component: Type<T>,
      public viewContainerRef: ViewContainerRef = null,
      public injector: Injector = null) {
    super();
  }

  protected _attach (host: INgxPortalHost): any {
    return host.attachComponent(this);
  }
}


export { NgxComponentPortal };

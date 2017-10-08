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


export class NgxComponentPortal<T>
  extends NgxBasePortal
  implements INgxComponentPortal<T>
{
  get componentType(): Type<T> {
    return this._componentType;
  }

  get viewContainerRef(): ViewContainerRef {
    return this._viewContainerRef;
  }

  get injector(): Injector {
    return this._injector;
  }

  /**
   * - component: The type of the component that will be instantiated for attachment.
   * - viewContainerRef: [Optional] Where the attached component should live in Angular's *logical* component tree.
   * This is different from where the component *renders*, which is determined by the NgxPortalHost.
   * The origin necessary when the host is outside of the Angular application context.
   * - injector: [Optional] Injector used for the instantiation of the component.
   */
  constructor (
      protected _componentType: Type<T>,
      protected _viewContainerRef: ViewContainerRef = null,
      protected _injector: Injector = null) {
    super();
  }

  protected _attach (host: INgxPortalHost): any {
    return host.attachComponent(this);
  }
}

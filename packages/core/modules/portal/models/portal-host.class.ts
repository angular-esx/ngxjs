import {
  ComponentRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ViewContainerRef,
} from '@angular/core';

import { isNull } from 'ngx-infrastructure';

import {
  INgxPortal,
  INgxTemplatePortal,
  INgxComponentPortal,
} from './portal.interface';
import { NgxBasePortalHost } from './base-portal-host.class';


class NgxPortalHost extends NgxBasePortalHost {
  constructor (
    protected _componentFactoryResolver: ComponentFactoryResolver,
    protected _viewContainerRef: ViewContainerRef
  ) {
    super();
  }

  protected _attachTemplatePortal<T> (portal: INgxTemplatePortal<T>): EmbeddedViewRef<T> {
    this._disposeFunc = () => this._viewContainerRef.clear();

    return this._viewContainerRef.createEmbeddedView(portal.templateRef);
  }

  protected _attachComponentPortal<T> (portal: INgxComponentPortal<T>): ComponentRef<T> {
    /**
     * If the portal specifies an origin, use that as the logical location of the component
     * in the application tree. Otherwise use the location of this NgxPortalHost.
     */
    const _viewContainerRef = isNull(portal.viewContainerRef) ? this._viewContainerRef : portal.viewContainerRef;

    const _componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.componentType);

    const componentRef = _viewContainerRef.createComponent(
      _componentFactory,
      _viewContainerRef.length,
      portal.injector || _viewContainerRef.parentInjector
    );

    this._disposeFunc = () => componentRef.destroy();

    return componentRef;
  }
}


export { NgxPortalHost };

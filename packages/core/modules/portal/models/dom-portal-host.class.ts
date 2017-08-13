import {
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  ApplicationRef,
  ViewContainerRef,
  Injector,
} from '@angular/core';

import { isNotNull } from 'ngx-infrastructure';

import {
  INgxTemplatePortal,
  INgxComponentPortal,
} from './portal.interface';
import { NgxBasePortalHost } from './base-portal-host.class';


class NgxDomPortalHost extends NgxBasePortalHost {
  constructor (
    protected _hostDomElement: Element,
    protected _componentFactoryResolver: ComponentFactoryResolver,
    protected _appRef: ApplicationRef,
    protected _defaultInjector: Injector
  ) {
    super();
  }

  dispose (): void {
    super.dispose();

    if (isNotNull(this._hostDomElement.parentNode)) {
      this._hostDomElement.parentNode.removeChild(this._hostDomElement);
    }
  }

  protected _attachTemplatePortal (portal: INgxTemplatePortal): Map<string, any> {
    const _viewContainerRef = portal.viewContainerRef;
    const _viewRef = _viewContainerRef.createEmbeddedView(portal.templateRef);
    _viewRef.detectChanges();
    /**
     * The method `createEmbeddedView` will add the view as a child of the viewContainer.
     * But for the NgxDomPortalHost the view can be added everywhere in the DOM (e.g Overlay Container)
     * To move the view to the specified host element. We just re-append the existing root nodes
     */
    _viewRef.rootNodes.forEach(rootNode => this._hostDomElement.appendChild(rootNode));

    this._disposeFunc = () => {
      const _index = _viewContainerRef.indexOf(_viewRef);
      if (_index !== -1) {
        _viewContainerRef.remove(_index);
      }
    };

    return new Map<string, any>();
  }

  protected _attachComponentPortal<T> (portal: INgxComponentPortal<T>): ComponentRef<T> {
    const _componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.componentType);
    let componentRef: ComponentRef<T>;

    /**
     * If the portal specifies a ViewContainerRef, we will use that as the attachment point
     * for the component (in terms of Angular's component tree, not rendering).
     * When the ViewContainerRef is missing, we use the factory to create the component directly
     * and then manually attach the ChangeDetector for that component to the application (which
     * happens automatically when using a ViewContainer).
     */
    if (portal.viewContainerRef) {
      componentRef = portal.viewContainerRef.createComponent<T>(
        _componentFactory,
        portal.viewContainerRef.length,
        portal.injector || portal.viewContainerRef.parentInjector
      );

      this._disposeFunc = () => componentRef.destroy();
    }
    else {
      componentRef = _componentFactory.create(portal.injector || this._defaultInjector);

      this._appRef.attachView(componentRef.hostView);

      this._disposeFunc = () => {
        this._appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      };
    }

    this._hostDomElement.appendChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);

    return componentRef;
  }
}


export { NgxDomPortalHost };

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
    private _hostDomElement: Element,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _viewContainerRef: ViewContainerRef,
    private _defaultInjector: Injector
  ) {
    super();
  }

  protected _attachTemplatePortal (portal: INgxTemplatePortal): Map<string, any> {
    const _viewContainerRef = this._viewContainerRef;
    const _viewRef = _viewContainerRef.createEmbeddedView(portal.templateRef);

    _viewRef.rootNodes.forEach(rootNode => this._hostDomElement.appendChild(rootNode));

    this.setDisposeFunc(() => {
      const _index = _viewContainerRef.indexOf(_viewRef);
      if (_index !== -1) {
        _viewContainerRef.remove(_index);
      }
    });

    return new Map<string, any>();
  }

  protected _attachComponentPortal<T> (portal: INgxComponentPortal<T>): ComponentRef<T> {
    const _componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
    let componentRef: ComponentRef<T>;

    /*
      If the portal specifies a ViewContainerRef, we will use that as the attachment point
      for the component (in terms of Angular's component tree, not rendering).
      When the ViewContainerRef is missing, we use the factory to create the component directly
      and then manually attach the ChangeDetector for that component to the application (which
      happens automatically when using a ViewContainer).
    */
    if (portal.viewContainerRef) {
      componentRef = portal.viewContainerRef.createComponent<T>(
        _componentFactory,
        portal.viewContainerRef.length,
        portal.injector || portal.viewContainerRef.parentInjector
      );

      this.setDisposeFunc(() => componentRef.destroy());
    }
    else {
      componentRef = _componentFactory.create(portal.injector || this._defaultInjector);

      /*
        ApplicationRef's attachView and detachView methods are in Angular ^2.3.0 but not before.
        The `else` clause here can be removed once 2.3.0 is released.
      */
      if ((this._appRef as any)['attachView']) {
        (this._appRef as any).attachView(componentRef.hostView);

        this.setDisposeFunc(() => {
          (this._appRef as any).detachView(componentRef.hostView);
          componentRef.destroy();
        });
      } else {
        /*
          When creating a component outside of a ViewContainer, we need to manually register
          its ChangeDetector with the application. This API is unfortunately not published
          in Angular < 2.3.0. The change detector must also be deregistered when the component
          is destroyed to prevent memory leaks.
        */
        const _changeDetectorRef = componentRef.changeDetectorRef;
        (this._appRef as any).registerChangeDetector(_changeDetectorRef);

        this.setDisposeFunc(() => {
          (this._appRef as any).unregisterChangeDetector(_changeDetectorRef);

          /*
            Normally the ViewContainer will remove the component's nodes from the DOM.
            Without a ViewContainer, we need to manually remove the nodes.
          */
          const _componentRootNode = this._getComponentRootNode(componentRef);
          if (_componentRootNode.parentNode) {
            _componentRootNode.parentNode.removeChild(_componentRootNode);
          }

          componentRef.destroy();
        });
      }
    }

    this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));

    return componentRef;
  }

  dispose (): void {
    super.dispose();

    if (isNotNull(this._hostDomElement.parentNode)) {
      this._hostDomElement.parentNode.removeChild(this._hostDomElement);
    }
  }

  private _getComponentRootNode (componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }
}


export { NgxDomPortalHost };

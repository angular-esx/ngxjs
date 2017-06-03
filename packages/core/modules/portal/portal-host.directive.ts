import {
  Directive,
  OnDestroy,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  Inject,
} from '@angular/core';

import { isNotNull } from 'ngx-infrastructure';

import {
  INgxPortal,
  NgxPortalHost,
  NgxTemplatePortal,
  NgxComponentPortal,
} from './models';


@Directive({
  selector: 'ng-template[ngxPortalHost]',
})
class NgxPortalHostDirective
  extends NgxPortalHost
  implements OnDestroy
{
  @Input('ngxPortalHost')
  get portal(): INgxPortal { return this._attachedPortal; }
  set portal(portal: INgxPortal) {
    if (this.hasAttached) { this.detach(); }

    if (isNotNull(portal)) {
      if (portal instanceof NgxTemplatePortal) {
        this._attachTemplatePortal(portal);
      }
      else if (portal instanceof NgxComponentPortal) {
        this._attachComponentPortal(portal);
      }
    }
  }

  constructor (
    @Inject(ComponentFactoryResolver) protected _componentFactoryResolver,
    @Inject(ViewContainerRef) protected _viewContainerRef
  ) {
    super(_componentFactoryResolver, _viewContainerRef);
  }

  ngOnDestroy () {
    this.dispose();
  }
}


export { NgxPortalHostDirective };

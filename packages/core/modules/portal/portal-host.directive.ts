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
  exportAs: 'ngxPortalHost',
})
export class NgxPortalHostDirective
  extends NgxPortalHost
  implements OnDestroy
{
  @Input('ngxPortalHost')
  get portal(): INgxPortal { return this._attachedPortal; }
  set portal(portal: INgxPortal) {
    if (this.hasAttached) { this.detach(); }

    if (isNotNull(portal)) {
      if (portal instanceof NgxTemplatePortal) {
        this.attachTemplate(portal);
      }
      else if (portal instanceof NgxComponentPortal) {
        this.attachComponent(portal);
      }
    }
  }

  constructor (
    @Inject(ComponentFactoryResolver) componentFactoryResolver: ComponentFactoryResolver,
    @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }

  ngOnDestroy () {
    this.dispose();
  }
}

import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Inject,
} from '@angular/core';

import { NgxTemplatePortal } from './models';


@Directive({
  selector: 'ng-template[ngxPortal]',
  exportAs: 'ngxPortal',
})
class NgxTemplatePortalDirective extends NgxTemplatePortal<any> {
  constructor (
    @Inject(TemplateRef) templateRef: TemplateRef<any>,
    @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef
  ) {
    super(templateRef, viewContainerRef);
  }
}


export { NgxTemplatePortalDirective };

import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Inject,
} from '@angular/core';

import { NgxTemplatePortal } from './models';


@Directive({
  selector: 'ng-template[ngxPortal]',
})
class NgxTemplatePortalDirective extends NgxTemplatePortal {
  constructor (@Inject(TemplateRef) public templateRef, @Inject(ViewContainerRef) public viewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}


export { NgxTemplatePortalDirective };

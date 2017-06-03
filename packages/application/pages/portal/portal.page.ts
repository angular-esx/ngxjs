/* tslint:disable: component-class-suffix */
import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import {
  NgxTemplatePortalDirective,
  NgxComponentPortal,
} from 'ngx-core';


@Component({
  selector: 'ngx-portal-page',
  templateUrl: './templates/portal.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-PortalPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class PortalPage implements OnInit {
  private _componentPortal: NgxComponentPortal<PortalComponentExample>;

  @ViewChild(NgxTemplatePortalDirective)
  private _templatePortal: NgxTemplatePortalDirective;


  ngOnInit (): void {
    this._componentPortal = new NgxComponentPortal(PortalComponentExample);
  }
}

@Component({
  selector: 'ngx-component-portal-example',
  template: `
    <div class="ngx-PortalPage__Example">
      <div [ngxTypo]="{ variant: 'headline', align: 'center' }">Component Portal</div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
class PortalComponentExample {}


export {
  PortalPage,
  PortalComponentExample,
};

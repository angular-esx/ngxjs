/* tslint:disable: component-class-suffix */
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import {
  NgxPortalHostDirective,
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
class PortalPage implements OnInit, AfterViewInit {
  private _componentPortal: NgxComponentPortal<PortalComponentExample>;

  @ViewChild(NgxPortalHostDirective)
  private _portalHost: NgxPortalHostDirective;

  @ViewChild(NgxTemplatePortalDirective)
  private _templatePortal: NgxTemplatePortalDirective;


  ngOnInit (): void {
    this._componentPortal = new NgxComponentPortal(PortalComponentExample);
  }

  ngAfterViewInit (): void {
    setTimeout(() => {
      this._portalHost.detach();
    }, 5 * 1000);

    setTimeout(() => {
      this._componentPortal = new NgxComponentPortal(PortalComponentExample);
    }, 10 * 1000);
  }
}

@Component({
  selector: 'ngx-component-portal-example',
  template: `
    <div class="ngx-PortalPage__Example">
      <div [ngxTypo]="{ type: 'headline', align: 'center' }">Component Portal</div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
class PortalComponentExample {}


export {
  PortalPage,
  PortalComponentExample,
};

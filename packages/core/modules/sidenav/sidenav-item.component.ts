import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

// TODO: Support icon, ripple
@Component({
  selector: 'ngx-sidenav-item, button[ngxSidenavItem], a[ngxSidenavItem]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./styles/sidenav-item/index.scss'],
  host: {
    '[class.ngx-Sidenav__Item]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'ngxSidenavItem',
})
export class NgxSidenavItemComponent {}

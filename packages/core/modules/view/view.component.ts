import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-view',
  template: '<ng-content></ng-content>',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-View]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'ngxView',
})
export class NgxViewComponent {}

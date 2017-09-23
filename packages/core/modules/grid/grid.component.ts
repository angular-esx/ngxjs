import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-grid',
  template: '<ng-content select="ngx-row"></ng-content>',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-Grid]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NgxGridComponent {}

import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-container',
  template: '<ng-content></ng-content>',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-Container]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'ngxContainer',
})
class NgxContainerComponent {}


export { NgxContainerComponent };

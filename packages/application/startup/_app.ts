/* tslint:disable: component-class-suffix */
import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-app',
  templateUrl: './templates/app.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-App]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxApp {}


export { NgxApp };

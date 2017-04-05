/* tslint:disable: component-class-suffix */
import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-app',
  templateUrl: './templates/app.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-App]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class NgxApp {}


export { NgxApp };

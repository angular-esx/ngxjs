/* tslint:disable: component-class-suffix */
import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-overlay-page',
  templateUrl: './templates/overlay.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-OverlayPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class OverlayPage {}


export { OverlayPage };

/* tslint:disable: component-class-suffix */
import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-sidenav-page',
  templateUrl: './templates/sidenav.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-SidenavPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class SidenavPage {}


export { SidenavPage };

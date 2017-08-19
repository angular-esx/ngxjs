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
class SidenavPage {
  isActiveLeftSidenav = true;

  resizeSidenav (event: { width: number, height: number }): void {
    if (event.width <= 960 && this.isActiveLeftSidenav) {
      this.isActiveLeftSidenav = false;
    }
    else if (event.width > 960 && !this.isActiveLeftSidenav) {
      this.isActiveLeftSidenav = true;
    }
  }
}


export { SidenavPage };

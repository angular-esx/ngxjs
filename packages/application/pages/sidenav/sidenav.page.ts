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
  private _isActiveLeftSidenav = true;

  private _resizeLeftSidenav (event: { width: number, height: number }): void {
    if (event.width <= 960 && this._isActiveLeftSidenav) {
      this._isActiveLeftSidenav = false;
    }
    else if (event.width > 960 && !this._isActiveLeftSidenav) {
      this._isActiveLeftSidenav = true;
    }
  }
}


export { SidenavPage };

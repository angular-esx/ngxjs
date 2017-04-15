import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-side-nav',
  templateUrl: './templates/side-nav.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-SideNavComponent]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxSideNavComponent {}


export { NgxSideNavComponent };

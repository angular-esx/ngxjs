import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-sidenav',
  templateUrl: './templates/sidenav.html',
  styleUrls: ['./styles/index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.ngx-Sidenav]': 'true',
  },
})
class NgxSidenavComponent {}


export { NgxSidenavComponent };

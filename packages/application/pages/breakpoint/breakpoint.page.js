import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-breakpoint-page',
  templateUrl: './templates/breakpoint.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-BreakpointPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class BreakpointPage {}


export { BreakpointPage };

import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-elevation-page',
  templateUrl: './templates/elevation.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-ElevationPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class ElevationPage {}


export { ElevationPage };

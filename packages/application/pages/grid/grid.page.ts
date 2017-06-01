/* tslint:disable: component-class-suffix */
import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-grid-page',
  templateUrl: './templates/grid.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-GridPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class GridPage {}


export { GridPage };

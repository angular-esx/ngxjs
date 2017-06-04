/* tslint:disable: component-class-suffix */
import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-card-page',
  templateUrl: './templates/card.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-CardPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class CardPage {}


export { CardPage };

import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-card',
  templateUrl: './templates/card.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-Card]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxCardComponent {}


export { NgxCardComponent };

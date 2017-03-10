import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-detail-page',
  templateUrl: './templates/detail.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-DetailPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class DetailPage {}


export { DetailPage };

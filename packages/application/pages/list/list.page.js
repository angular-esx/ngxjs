import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-list-page',
  templateUrl: './templates/list.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-ListPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class ListPage {}


export { ListPage };

import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-container-page',
  templateUrl: './templates/container.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-ContainerPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class ContainerPage {}


export { ContainerPage };

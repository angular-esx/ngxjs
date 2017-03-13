import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-color-page',
  templateUrl: './templates/color.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-ColorPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class ColorPage {}


export { ColorPage };

import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-tall-script',
  templateUrl: './templates/tall-script.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-TallScriptComponent]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class TallScriptComponent {}


export { TallScriptComponent };

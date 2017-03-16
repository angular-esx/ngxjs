import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-dense-script',
  templateUrl: './templates/dense-script.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-DenseScriptComponent]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class DenseScriptComponent {}


export { DenseScriptComponent };

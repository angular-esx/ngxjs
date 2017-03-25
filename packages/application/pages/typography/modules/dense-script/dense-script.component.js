import { Component } from '@angular/core';


@Component({
  selector: 'ngx-dense-script',
  templateUrl: './templates/dense-script.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-DenseScriptComponent]': 'true',
  },
})
class DenseScriptComponent {}


export { DenseScriptComponent };

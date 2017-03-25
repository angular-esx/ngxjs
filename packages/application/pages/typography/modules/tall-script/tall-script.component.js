import { Component } from '@angular/core';


@Component({
  selector: 'ngx-tall-script',
  templateUrl: './templates/tall-script.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-TallScriptComponent]': 'true',
  },
})
class TallScriptComponent {}


export { TallScriptComponent };

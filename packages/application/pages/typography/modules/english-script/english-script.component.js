import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-english-script',
  templateUrl: './templates/english-script.html',
  host: {
    '[class.ngx-EnglishScriptComponent]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class EnglishScriptComponent {}


export { EnglishScriptComponent };

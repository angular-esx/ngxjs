import { Component } from '@angular/core';


@Component({
  selector: 'ngx-english-script',
  templateUrl: './templates/english-script.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-EnglishScriptComponent]': 'true',
  },
})
class EnglishScriptComponent {}


export { EnglishScriptComponent };

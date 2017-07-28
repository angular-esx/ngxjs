/* tslint:disable: component-class-suffix */
import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


type _ItemType = { name: string };

@Component({
  selector: 'ngx-toolbar-page',
  templateUrl: './templates/toolbar.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-ToolbarPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class ToolbarPage {

}


export { ToolbarPage };

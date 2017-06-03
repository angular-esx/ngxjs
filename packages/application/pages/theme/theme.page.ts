/* tslint:disable: component-class-suffix */
import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-theme-page',
  templateUrl: './templates/theme.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-ThemePage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class ThemePage {}


export { ThemePage };

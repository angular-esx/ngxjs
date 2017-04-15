import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-toolbar',
  templateUrl: './templates/toolbar.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-ToolbarComponent]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxToolbarComponent {}


export { NgxToolbarComponent };

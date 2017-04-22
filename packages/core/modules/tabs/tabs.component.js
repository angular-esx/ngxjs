import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-tabs',
  templateUrl: './templates/tabs.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-TabsComponent]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxTabsComponent {}


export { NgxTabsComponent };

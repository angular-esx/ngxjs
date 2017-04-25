import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'layout-tabs',
  templateUrl: './templates/layout-tabs.component.html',
  styleUrls: ['./styles/layout-tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'layout-tabs',
  },
})
export class LayoutTabsComponent {

}

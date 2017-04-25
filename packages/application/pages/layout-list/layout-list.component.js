import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'layout-list',
  templateUrl: './templates/layout-list.component.html',
  styleUrls: ['./styles/layout-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'layout-list',
  },
})
export class LayoutListComponent { }

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'layout-grid',
  templateUrl: './templates/layout-grid.component.html',
  styleUrls: ['./styles/layout-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'layout-grid',
  },
})
export class LayoutGridComponent { }

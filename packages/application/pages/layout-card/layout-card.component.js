import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'layout-card',
  templateUrl: './templates/layout-card.component.html',
  styleUrls: ['./styles/layout-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'layout-card',
  },
})
export class LayoutCardComponent {
  open = false;

  toggle() {
    this.open = !this.open;
  }
}

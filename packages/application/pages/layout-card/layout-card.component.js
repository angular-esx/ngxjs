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
  mode1 = 'over';
  mode2 = 'over';

  sideSide() {
    this.open = !this.open;
    this.mode1 = 'side';
    this.mode2 = 'side';
  }

  overOver() {
    this.open = !this.open;
    this.mode1 = 'over';
    this.mode2 = 'over';
  }

  sideOver() {
    this.open = !this.open;
    this.mode1 = 'side';
    this.mode2 = 'over';
  }

  pushOver() {
    this.open = !this.open;
    this.mode1 = 'push';
    this.mode2 = 'over';
  }
}

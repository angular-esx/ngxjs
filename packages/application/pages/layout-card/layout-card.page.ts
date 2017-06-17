/* tslint:disable: component-class-suffix */
import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-layout-card-page',
  templateUrl: './templates/layout-card.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-LayoutCardPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class LayoutCardPage {
  open = false;
  mode1 = 'over';
  mode2 = 'over';

  sideSide () {
    this.open = !this.open;
    this.mode1 = 'side';
    this.mode2 = 'side';
  }

  overOver () {
    this.open = !this.open;
    this.mode1 = 'over';
    this.mode2 = 'over';
  }

  sideOver () {
    this.open = !this.open;
    this.mode1 = 'side';
    this.mode2 = 'over';
  }

  pushOver () {
    this.open = !this.open;
    this.mode1 = 'push';
    this.mode2 = 'over';
  }
}


export { LayoutCardPage };

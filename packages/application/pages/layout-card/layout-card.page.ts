/* tslint:disable: component-class-suffix */
import {
  Component,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';

import { NgxSidenavComponent } from 'ngx-core';

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
  @ViewChild('sidenavLeft') sidenavLeft: NgxSidenavComponent;
  @ViewChild('sidenavRight') sidenavRight: NgxSidenavComponent;

  mode1: string;
  mode2: string;

  toggle () {
    this.sidenavLeft.toggle();
    this.sidenavRight.toggle();
  }

  sideSide () {
    this.mode1 = 'side';
    this.sidenavLeft.toggle();
  }

  overOver () {
    this.mode1 = 'over';
    this.mode2 = 'over';
    this.toggle();
  }

  sideOver () {
    this.mode1 = 'side';
    this.mode2 = 'over';
    this.toggle();
  }

  pushOver () {
    this.mode1 = 'push';
    this.mode2 = 'over';
    this.toggle();
  }

  onHideSide (event) {
    console.log(event);
  }

}


export { LayoutCardPage };

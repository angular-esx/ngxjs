import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ContentChildren,
  SimpleChanges,
  ChangeDetectorRef,
  Inject,
  AfterContentChecked,
} from '@angular/core';

import { NgxSidenavComponent } from './sidenav.component';

@Component({
  selector: 'ngx-sidenav-container',
  templateUrl: './templates/sidenav-container.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    class: 'ngx-SidenavContainer',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxSidenavContainerComponent implements AfterContentChecked {
  mode = [];

  @ContentChildren(NgxSidenavComponent) sidenavs;

  constructor (
    @Inject(ChangeDetectorRef) private cd: ChangeDetectorRef
  ) { }

  ngAfterContentChecked () {
    this.checkChangeState();
  }

  checkChangeState () {
    this.mode = [];
    this.sidenavs.forEach((sidenav) => {
      if (sidenav.opened === true) {
        this.mode.push(`${sidenav.type}-${sidenav.align}`);
      }
    });

    this.cd.markForCheck();
  }
}


export {
  NgxSidenavContainerComponent,
};

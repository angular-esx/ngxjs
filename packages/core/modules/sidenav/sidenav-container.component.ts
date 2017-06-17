import {
  Component,
  // ChangeDetectionStrategy,
  ViewEncapsulation,
  ContentChildren,
} from '@angular/core';

import {
  NgxSidenavComponent,
} from './sidenav.component';

@Component({
  selector: 'ngx-sidenav-container',
  templateUrl: './templates/sidenav-container.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    class: 'ngx-SideNavContainer',
  },
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxSidenavContainerComponent {
  modes = [];

  @ContentChildren(NgxSidenavComponent) sideNavs;

  // ngAfterContentInit () {
  //   this.checkChangeState();
  // }

  // ngAfterContentChecked () {
  //   this.checkChangeState();
  // }

  checkChangeState () {
    this.modes = [];
    this.sideNavs.forEach((sideNav) => {
      if (sideNav.opened === true) {
        this.modes.push(`mode_${sideNav.type}-${sideNav.side}`);
      }
    });
  }

}


export {
  NgxSidenavContainerComponent,
};

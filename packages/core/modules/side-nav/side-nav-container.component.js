import {
  Component,
  // ChangeDetectionStrategy,
  ViewEncapsulation,
  ContentChildren,
} from '@angular/core';

import {
  NgxSideNavComponent,
} from './side-nav.component';

@Component({
  selector: 'ngx-side-nav-container',
  templateUrl: './templates/side-nav-container.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    class: 'ngx-SideNavContainerComponent',
  },
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxSideNavContainerComponent {
  modes = [];

  @ContentChildren(NgxSideNavComponent) sideNavs;

  ngAfterContentInit() {
    this.checkChangeState();
  }

  ngAfterContentChecked() {
    this.checkChangeState();
  }

  checkChangeState() {
    this.modes = [];
    this.sideNavs.forEach((sideNav) => {
      if (sideNav.opened === true) {
        this.modes.push(`mode_${sideNav.mode}_side_${sideNav.side}`);
      }
    });
  }

}


export {
  NgxSideNavContainerComponent,
};

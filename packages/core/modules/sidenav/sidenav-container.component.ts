import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ContentChildren,
  ChangeDetectorRef,
  Inject,
  AfterContentChecked,
  QueryList,
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
  mode: Array<string> = [];
  backdrop: boolean = false;

  @ContentChildren(NgxSidenavComponent) sidenavs: QueryList<NgxSidenavComponent>;

  constructor (
    @Inject(ChangeDetectorRef) private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterContentChecked () {
    this.checkChangeState();
  }

  checkChangeState () {
    this.mode = [];
    this.backdrop = false;

    this.sidenavs.forEach((sidenav) => {
      if (sidenav.isOpen) {

        const type = sidenav.currentType;

        if (type === 'over' || type === 'push') {
          this.backdrop = true;
        }

        this.mode.push(`${type}-${sidenav.align}`);
      }
    });

    this._changeDetectorRef.markForCheck();
  }

  close () {
    this.sidenavs.forEach((sidenav) => {
      sidenav.close();
    });
  }
}


export {
  NgxSidenavContainerComponent,
};

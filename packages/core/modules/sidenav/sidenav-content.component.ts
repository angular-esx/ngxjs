import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
} from '@angular/core';

import { isArray } from 'ngx-infrastructure';

@Component({
  selector: 'ngx-sidenav-content',
  templateUrl: './templates/sidenav-content.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class]': '_getClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxSidenavContentComponent {
  @Input() modes;

  _getClass () {
    const _classes = ['ngx-SidenavContent'];

    if (this.modes && isArray(this.modes) && this.modes.length > 0) {
      this.modes.forEach((mode) => {
        _classes.push(`ngx-SidenavContent_${mode}`);
      });
    }

    return _classes.join(' ');
  }
}


export { NgxSidenavContentComponent };

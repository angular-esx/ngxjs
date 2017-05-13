import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
} from '@angular/core';

import { isArray } from 'ngx-infrastructure';

@Component({
  selector: 'ngx-side-nav-content',
  templateUrl: './templates/side-nav-content.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class]': '_getClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxSideNavContentComponent {
  @Input() modes;

  _getClass() {
    const _classes = ['ngx-SideNavContentComponent'];

    if (this.modes && isArray(this.modes) && this.modes.length > 0) {
      this.modes.forEach((mode) => {
        _classes.push(`ngx-SideNavContentComponent_${mode}`);
      });
    }

    return _classes.join(' ');
  }
}


export { NgxSideNavContentComponent };

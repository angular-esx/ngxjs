import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
} from '@angular/core';


@Component({
  selector: 'ngx-side-nav',
  templateUrl: './templates/side-nav.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class]': '_getClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxSideNavComponent {
  // 'over', 'push', 'side'
  @Input() mode;
  @Input() opened;

  _getClass() {
    const _classes = ['ngx-SideNavComponent'];

    if (this.mode) {
      _classes.push(`ngx-SideNavComponent_mode_${this.mode}`);
    }

    if (this.opened) {
      _classes.push(`ngx-SideNavComponent_opened_${this.opened}`);
    }

    return _classes.join(' ');
  }
}


export { NgxSideNavComponent };

import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-background',
  templateUrl: './templates/background.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class]': '_getClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class BackgroundComponent {
  @Input() variant;
  @Input() state;

  _getClass() {
    const _classes = ['ngx-BackgroundComponent'];

    if (['primary', 'success', 'warn', 'danger'].indexOf(this.variant) > -1) {
      _classes.push(`ngx-BackgroundComponent_variant_${this.variant}`);
    }

    if (['active', 'disabled'].indexOf(this.state) > -1) {
      _classes.push(`ngx-BackgroundComponent_state_${this.state}`);
    }

    return _classes.join(' ');
  }
}


export { BackgroundComponent };

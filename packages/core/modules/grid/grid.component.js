import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-grid',
  template: '<ng-content select="ngx-row"></ng-content>',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class]': '_getClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxGridComponent {
  /*
    Only accept 'fluid'
  */
  @Input() type;

  _getClass() {
    const _classes = ['ngx-GridComponent'];

    if (this.type) {
      _classes.push(`ngx-GridComponent_type_${this.type}`);
    }

    return _classes.join(' ');
  }
}


export { NgxGridComponent };

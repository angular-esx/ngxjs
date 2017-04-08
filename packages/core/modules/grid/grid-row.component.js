import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-row',
  template: '<ng-content select="ngx-col"></ng-content>',
  host: {
    '[class]': '_getClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxGridRowComponent {
  /*
    breakpoint: xs | sm | md | lg |xl
  */
  /*
    Only accept: no-gutters
  */
  @Input() type;
  /*
    Only accept: [breakpoint]-start | [breakpoint]-center | [breakpoint]-end
  */
  @Input() verticalAlign;
  /*
    Only accept: [breakpoint]-start | [breakpoint]-center | [breakpoint]-end | [breakpoint]-around | [breakpoint]-between
  */
  @Input() horizontalAlign;


  _getClass() {
    const _classes = ['ngx-GridComponent__GridRowComponent'];
    let _items;

    if (this.type) {
      _classes.push(`ngx-GridComponent__GridRowComponent_type_${this.type}`);
    }
    if (this.verticalAlign) {
      _items = this.verticalAlign.split(' ');

      _items.forEach(item => _classes.push(`ngx-GridComponent__GridRowComponent_align-vertical_${item}`));
    }
    if (this.horizontalAlign) {
      _items = this.horizontalAlign.split(' ');

      _items.forEach(item => _classes.push(`ngx-GridComponent__GridRowComponent_align-horizontal_${item}`));
    }

    return _classes.join(' ');
  }
}


export { NgxGridRowComponent };

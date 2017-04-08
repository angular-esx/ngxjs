import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-col',
  template: '<ng-content></ng-content>',
  host: {
    '[class]': '_getClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgxGridColumnComponent {
  /*
    breakpoint: xs | sm | md | lg |xl
  */
  /*
    Only accept: [breakpoint]-start | [breakpoint]-center | [breakpoint]-end
  */
  @Input() align;
  /*
    Only accept: [breakpoint]-[1-12]
  */
  @Input() size;
  /*
    Only accept: [breakpoint]-[1-12]
  */
  @Input() order;
  /*
    Only accept: [breakpoint]-[1-11]
  */
  @Input() offset;
  /*
    Only accept: [breakpoint]-[0-12]
  */
  @Input() pull;
  /*
    Only accept: [breakpoint]-[0-12]
  */
  @Input() push;


  _getClass() {
    const _classes = ['ngx-GridComponent__GridColumnComponent'];
    let _items;

    if (this.align) {
      _items = this.align.split(' ');

      _items.forEach(item => _classes.push(`ngx-GridComponent__GridColumnComponent_align_${item}`));
    }
    if (this.size) {
      _items = this.size.split(' ');

      _items.forEach(item => _classes.push(`ngx-GridComponent__GridColumnComponent_size_${item}`));
    }
    if (this.order) {
      _items = this.order.split(' ');

      _items.forEach(item => _classes.push(`ngx-GridComponent__GridColumnComponent_order_${item}`));
    }
    if (this.offset) {
      _items = this.offset.split(' ');

      _items.forEach(item => _classes.push(`ngx-GridComponent__GridColumnComponent_offset_${item}`));
    }
    if (this.push) {
      _items = this.push.split(' ');

      _items.forEach(item => _classes.push(`ngx-GridComponent__GridColumnComponent_push_${item}`));
    }
    if (this.pull) {
      _items = this.pull.split(' ');

      _items.forEach(item => _classes.push(`ngx-GridComponent__GridColumnComponent_pull_${item}`));
    }

    return _classes.join(' ');
  }
}


export { NgxGridColumnComponent };

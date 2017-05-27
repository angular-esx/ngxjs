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
  @Input() align:
    'xs-start' | 'xs-center' | 'xs-end' |
    'sm-start' | 'sm-center' | 'sm-end' |
    'md-start' | 'md-center' | 'md-end' |
    'lg-start' | 'lg-center' | 'lg-end' |
    'xl-start' | 'xl-center' | 'xl-end';
  @Input() size:
    'xs-1' | 'xs-2' | 'xs-3' | 'xs-4' | 'xs-5' | 'xs-6' | 'xs-7' | 'xs-8' | 'xs-9' | 'xs-10' | 'xs-11' | 'xs-12' |
    'sm-1' | 'sm-2' | 'sm-3' | 'sm-4' | 'sm-5' | 'sm-6' | 'sm-7' | 'sm-8' | 'sm-9' | 'sm-10' | 'sm-11' | 'sm-12' |
    'md-1' | 'md-2' | 'md-3' | 'md-4' | 'md-5' | 'md-6' | 'md-7' | 'md-8' | 'md-9' | 'md-10' | 'md-11' | 'md-12' |
    'lg-1' | 'lg-2' | 'lg-3' | 'lg-4' | 'lg-5' | 'lg-6' | 'lg-7' | 'lg-8' | 'lg-9' | 'lg-10' | 'lg-11' | 'lg-12' |
    'xl-1' | 'xl-2' | 'xl-3' | 'xl-4' | 'xl-5' | 'xl-6' | 'xl-7' | 'xl-8' | 'xl-9' | 'xl-10' | 'xl-11' | 'xl-12';
  @Input() order:
    'xs-1' | 'xs-2' | 'xs-3' | 'xs-4' | 'xs-5' | 'xs-6' | 'xs-7' | 'xs-8' | 'xs-9' | 'xs-10' | 'xs-11' | 'xs-12' |
    'sm-1' | 'sm-2' | 'sm-3' | 'sm-4' | 'sm-5' | 'sm-6' | 'sm-7' | 'sm-8' | 'sm-9' | 'sm-10' | 'sm-11' | 'sm-12' |
    'md-1' | 'md-2' | 'md-3' | 'md-4' | 'md-5' | 'md-6' | 'md-7' | 'md-8' | 'md-9' | 'md-10' | 'md-11' | 'md-12' |
    'lg-1' | 'lg-2' | 'lg-3' | 'lg-4' | 'lg-5' | 'lg-6' | 'lg-7' | 'lg-8' | 'lg-9' | 'lg-10' | 'lg-11' | 'lg-12' |
    'xl-1' | 'xl-2' | 'xl-3' | 'xl-4' | 'xl-5' | 'xl-6' | 'xl-7' | 'xl-8' | 'xl-9' | 'xl-10' | 'xl-11' | 'xl-12';
  @Input() offset:
    'xs-1' | 'xs-2' | 'xs-3' | 'xs-4' | 'xs-5' | 'xs-6' | 'xs-7' | 'xs-8' | 'xs-9' | 'xs-10' | 'xs-11' |
    'sm-1' | 'sm-2' | 'sm-3' | 'sm-4' | 'sm-5' | 'sm-6' | 'sm-7' | 'sm-8' | 'sm-9' | 'sm-10' | 'sm-11' |
    'md-1' | 'md-2' | 'md-3' | 'md-4' | 'md-5' | 'md-6' | 'md-7' | 'md-8' | 'md-9' | 'md-10' | 'md-11' |
    'lg-1' | 'lg-2' | 'lg-3' | 'lg-4' | 'lg-5' | 'lg-6' | 'lg-7' | 'lg-8' | 'lg-9' | 'lg-10' | 'lg-11' |
    'xl-1' | 'xl-2' | 'xl-3' | 'xl-4' | 'xl-5' | 'xl-6' | 'xl-7' | 'xl-8' | 'xl-9' | 'xl-10' | 'xl-11';
  @Input() pull:
    'xs-0' | 'xs-1' | 'xs-2' | 'xs-3' | 'xs-4' | 'xs-5' | 'xs-6' | 'xs-7' | 'xs-8' | 'xs-9' | 'xs-10' | 'xs-11' | 'xs-12' |
    'sm-0' | 'sm-1' | 'sm-2' | 'sm-3' | 'sm-4' | 'sm-5' | 'sm-6' | 'sm-7' | 'sm-8' | 'sm-9' | 'sm-10' | 'sm-11' | 'sm-12' |
    'md-0' | 'md-1' | 'md-2' | 'md-3' | 'md-4' | 'md-5' | 'md-6' | 'md-7' | 'md-8' | 'md-9' | 'md-10' | 'md-11' | 'md-12' |
    'lg-0' | 'lg-1' | 'lg-2' | 'lg-3' | 'lg-4' | 'lg-5' | 'lg-6' | 'lg-7' | 'lg-8' | 'lg-9' | 'lg-10' | 'lg-11' | 'lg-12' |
    'xl-0' | 'xl-1' | 'xl-2' | 'xl-3' | 'xl-4' | 'xl-5' | 'xl-6' | 'xl-7' | 'xl-8' | 'xl-9' | 'xl-10' | 'xl-11' | 'xl-12';
  @Input() push:
    'xs-0' | 'xs-1' | 'xs-2' | 'xs-3' | 'xs-4' | 'xs-5' | 'xs-6' | 'xs-7' | 'xs-8' | 'xs-9' | 'xs-10' | 'xs-11' | 'xs-12' |
    'sm-0' | 'sm-1' | 'sm-2' | 'sm-3' | 'sm-4' | 'sm-5' | 'sm-6' | 'sm-7' | 'sm-8' | 'sm-9' | 'sm-10' | 'sm-11' | 'sm-12' |
    'md-0' | 'md-1' | 'md-2' | 'md-3' | 'md-4' | 'md-5' | 'md-6' | 'md-7' | 'md-8' | 'md-9' | 'md-10' | 'md-11' | 'md-12' |
    'lg-0' | 'lg-1' | 'lg-2' | 'lg-3' | 'lg-4' | 'lg-5' | 'lg-6' | 'lg-7' | 'lg-8' | 'lg-9' | 'lg-10' | 'lg-11' | 'lg-12' |
    'xl-0' | 'xl-1' | 'xl-2' | 'xl-3' | 'xl-4' | 'xl-5' | 'xl-6' | 'xl-7' | 'xl-8' | 'xl-9' | 'xl-10' | 'xl-11' | 'xl-12';


  _getClass (): string {
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

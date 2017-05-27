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
  @Input() type: 'no-gutters' | null;
  @Input() verticalAlign:
    'xs-start' | 'xs-center' | 'xs-end' |
    'sm-start' | 'sm-center' | 'sm-end' |
    'md-start' | 'md-center' | 'md-end' |
    'lg-start' | 'lg-center' | 'lg-end' |
    'xl-start' | 'xl-center' | 'xl-end';
  @Input() horizontalAlign:
    'xs-start' | 'xs-center' | 'xs-end' | 'xs-around' | 'xs-between' |
    'sm-start' | 'sm-center' | 'sm-end' | 'sm-around' | 'sm-between' |
    'md-start' | 'md-center' | 'md-end' | 'md-around' | 'md-between' |
    'lg-start' | 'lg-center' | 'lg-end' | 'lg-around' | 'lg-between' |
    'xl-start' | 'xl-center' | 'xl-end' | 'xl-around' | 'xl-between';


  _getClass (): string {
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

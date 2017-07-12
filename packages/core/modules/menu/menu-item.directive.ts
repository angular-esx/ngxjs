import {
  Directive,
  Input,
  HostListener,
} from '@angular/core';


@Directive({
  selector: 'button[ngxMenuItem], a[ngxMenuItem]',
  host: {
    '[class]': '_getClass()',
  },
})
class MenuItemDirective {
  @Input('class') initialClass: string;
  @Input() isDisabled: boolean = false;

  private _getClass (): string {
    const _classes: Array<string> = ['ngx-MenuComponent__MenuItemDirective'];

    if (this.isDisabled) {
      _classes.push('ngx-MenuComponent__MenuItemDirective_state_disabled');
    }
    if (this.initialClass) {
      this.initialClass
      .split(' ')
      .forEach(item => _classes.push(item));
    }

    return _classes.join(' ');
  }

  @HostListener('click', ['$event'])
  private _click (event: Event): void {
    if (this.isDisabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}


export { MenuItemDirective };

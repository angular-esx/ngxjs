import {
  Component,
  Input,
  Output,
  ContentChildren,
  QueryList,
  ViewChild,
  Attribute,
  EventEmitter,
  TemplateRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import {
  MenuPositionXType,
  MenuPositionYType
} from './models';

import { MenuItemDirective } from './menu-item.directive';


@Component({
  selector: 'ngx-menu',
  templateUrl: './templates/menu.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-MenuComponent]': 'true',
  },
  animations: [
    trigger('transformMenu', [
      state('showing', style({
        opacity: 1,
        transform: 'scale(1)',
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'scale(0)'
        }),
        animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)'),
      ]),
      transition('* => void', [
        animate('50ms 100ms linear', style({ opacity: 0 })),
      ]),
    ]),

    trigger('fadeInItems', [
      state('showing', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('200ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
      ]),
    ]),
  ],
  exportAs: 'ngxMenu',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private _positionX: MenuPositionXType = 'after';
  private _positionY: MenuPositionYType = 'below';

  cssClass: Object;

  get positionX() { return  this._positionX; }
  get positionY() { return  this._positionY; }

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  @ContentChildren(MenuItemDirective) items: QueryList<MenuItemDirective>;

  @Input('class') initialClass: string;
  @Input() isOverlapped: boolean = true;

  @Output('onClose') closeEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor (
    @Attribute('positionX') positionX: MenuPositionXType,
    @Attribute('positionY') positionY: MenuPositionYType
  ) {
    this.setPositionClasses(positionX, positionY);
  }

  setPositionClasses (positionX: MenuPositionXType, positionY: MenuPositionYType): void {
    const cssClass: any = {};

    if (positionX) { this._positionX = positionX; }
    if (positionY) { this._positionY = positionY; }

    if (this.initialClass) {
      this.initialClass
      .split(' ')
      .forEach(item => { cssClass[item] = true; });
    }

    if (['before', 'after'].some(item => item === this._positionX)) {
      cssClass[`ngx-MenuComponent__MenuPanel_position_${this._positionX}`] = true;
    }

    if (['above', 'below'].some(item => item === this._positionY)) {
      cssClass[`ngx-MenuComponent__MenuPanel_position_${this._positionY}`] = true;
    }

    this.cssClass = cssClass;
  }

  close (): void {
    this.closeEmitter.emit();
  }
}

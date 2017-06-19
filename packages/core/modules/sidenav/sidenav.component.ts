import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
  ElementRef,
  OnChanges,
  SimpleChanges,
  Attribute,
  EventEmitter,
  Output,
} from '@angular/core';

import { NgxRenderService } from '../../services';
import { parseBoolean } from 'ngx-infrastructure';

@Component({
  selector: 'ngx-sidenav',
  templateUrl: './templates/sidenav.html',
  styleUrls: ['./styles/index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.ngx-Sidenav]': 'true',
  },
  exportAs: 'ngxSidenav'
})
class NgxSidenavComponent implements OnChanges {
  private _opened: boolean;

  @Input() type: string;
  @Input() align: string;

  @Output() onAfterOpen = new EventEmitter();
  @Output() onAfterClose = new EventEmitter();

  constructor (
    @Attribute('opened') private opened: string,
    @Inject(NgxRenderService) private _renderer: NgxRenderService,
    @Inject(ElementRef) private _elementRef: ElementRef,
  ) {

    this._opened = parseBoolean(opened);

    if (this._opened) {
      this.open();
    } else {
      this.close();
    }
  }

  ngOnChanges (changes: SimpleChanges) {
    this._renderer.changeClass(
      this._elementRef.nativeElement,
      changes,
      (propName, change) => change.previousValue.toString().split(' ').map(value => this._getClass(propName, value)),
      (propName, change) => change.currentValue.toString().split(' ').map(value => this._getClass(propName, value)),
    );
  }

  private _getClass (propName: string, value: any): string {
    return propName && value ? `ngx-Sidenav_${propName}_${value}` : '';
  }

  open (): void {
    this._opened = true;
    this._renderer.addClass(this._elementRef.nativeElement, 'ngx-Sidenav_opened_true');

    this.onAfterOpen.next('opened');
  }

  close (): void {
    this._opened = false;
    this._renderer.removeClass(this._elementRef.nativeElement, 'ngx-Sidenav_opened_true');

    this.onAfterClose.next('closed');
  }

  toggle (): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  isOpen (): boolean {
    return this._opened ? true : false;
  }
}


export { NgxSidenavComponent };

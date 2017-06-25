import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges,
  Attribute,
  EventEmitter,
  Output,
  HostListener,
} from '@angular/core';

import { NgxRenderService } from '../../services';
import { parseBoolean, parseNumber } from 'ngx-infrastructure';

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
class NgxSidenavComponent implements OnInit, OnChanges {
  private _opened: boolean;
  private _currentType: 'over' | 'push' | 'side' | string;
  private _windowSize: number;

  @Input() type: 'over' | 'push' | 'side' | string;
  @Input() align: 'left' | 'right' | string;
  @Input() whenHideSide: string;
  @Input() typeWhenHideSide: 'over' | 'push' | string;

  @Output() onHideSide = new EventEmitter();
  @Output() onAfterOpen = new EventEmitter();
  @Output() onAfterClose = new EventEmitter();

  get currentType(): string {
    return this._currentType;
  }

  get isOpen (): boolean {
    return this._opened ? true : false;
  }

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
    this._currentType = this.type;

    if (this.type === 'side' && changes.type) {
      delete changes.type;
    }

    if (changes.whenHideSide) {
      delete changes.whenHideSide;
    }

    if (changes.typeWhenHideSide) {
      delete changes.typeWhenHideSide;
    }

    this._renderer.changeClass(
      this._elementRef.nativeElement,
      changes,
      (propName, change) => change.previousValue.toString().split(' ').map(value => this._getClass(propName, value)),
      (propName, change) => change.currentValue.toString().split(' ').map(value => this._getClass(propName, value)),
    );
  }

  ngOnInit () {
    if (window) {
      this.handleResize(window.innerWidth);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize (event) {
    this.handleResize(event.target.innerWidth);
  }

  handleResize (windowSize) {
    if (this.type === 'side') {
      const whenHideSide = this.whenHideSide ? parseNumber(this.whenHideSide) : 960;

      if (whenHideSide >= windowSize) {
        this._currentType = this.typeWhenHideSide;
        this.onHideSide.emit('hided');
        this._renderer.removeClass(this._elementRef.nativeElement, `ngx-ScurrentTdenav_type_${this.type}`);
      } else {
        this._currentType = this.type;
        this.onHideSide.emit('showed');
        this._renderer.removeClass(this._elementRef.nativeElement, `ngx-ScurrentTdenav_type_${this.typeWhenHideSide}`);
      }

      this._renderer.addClass(this._elementRef.nativeElement, `ngx-Sidenav_type_${this._type}`);
    }
  }

  toggle (): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
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

  private _getClass (propName: string, value: any): string {
    return propName && value ? `ngx-Sidenav_${propName}_${value}` : '';
  }
}


export { NgxSidenavComponent };

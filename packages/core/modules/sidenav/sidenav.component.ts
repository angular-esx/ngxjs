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
  EventEmitter,
  Output,
  HostListener,
} from '@angular/core';

import { parseBoolean } from 'ngx-infrastructure';

import { NgxRenderService } from '../../services';


@Component({
  selector: 'ngx-sidenav',
  template: '<ng-content></ng-content>',
  styleUrls: ['./styles/sidenav/index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.ngx-Sidenav]': 'true',
  },
  exportAs: 'ngxSidenav'
})
class NgxSidenavComponent implements OnChanges, OnInit {
  private _isActive: boolean;

  @Input() type: 'over' | 'push' | 'side' = 'side';
  @Input() align: 'left' | 'right' = 'left';
  @Input()
  get isActive(): boolean {
    return this._isActive;
  }
  set isActive(value: boolean) {
    this._isActive = parseBoolean(value);
  }

  @Output('onResize') resizeEmitter = new EventEmitter<{ width: number, height: number }>();


  constructor (
    @Inject(ElementRef) private _elementRef: ElementRef,
    @Inject(NgxRenderService) private _renderService: NgxRenderService,
  ) {}

  ngOnChanges (changes: SimpleChanges): void {
    this._renderService.changeClass(
      this._elementRef.nativeElement,
      changes,
      (propName, change) => change.previousValue.toString().split(' ').map(value => this._getClass(propName, value)),
      (propName, change) => change.currentValue.toString().split(' ').map(value => this._getClass(propName, value)),
    );
  }

  ngOnInit (): void {
    if (this.isActive) { this.open(); }

    this._emitWindowResizedEvent();
  }

  toggle (): void {
    return this._isActive ? this.close() : this.open();
  }

  open (): void {
    this._isActive = true;
    this._renderService.addClass(this._elementRef.nativeElement, 'ngx-Sidenav_state_active');
  }

  close (): void {
    this._isActive = false;
    this._renderService.removeClass(this._elementRef.nativeElement, 'ngx-Sidenav_state_active');
  }

  @HostListener('window:resize')
  private _emitWindowResizedEvent (): void {
    if (window) {
      this.resizeEmitter.next({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }

  private _getClass (propName: string, value: any): string {
    if (propName && value) {
      switch (propName) {
        case 'isActive':
          return parseBoolean(value) ? 'ngx-Sidenav_state_active' : '';
        default:
          return `ngx-Sidenav_${propName}_${value}`;
      }
    }

    return '';
  }
}


export { NgxSidenavComponent };

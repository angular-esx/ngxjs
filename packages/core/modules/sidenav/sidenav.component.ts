import {
  Component,
  OnChanges,
  OnInit,
  Input,
  ElementRef,
  SimpleChanges,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
} from '@angular/core';

import { parseBoolean } from 'ngx-infrastructure';

import {
  INgxRenderer,
  INgxRenderService,
  NgxRenderService,
} from '../../services';


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
  private _renderer: INgxRenderer;
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

  constructor (
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(NgxRenderService) renderService: INgxRenderService,
  ) {
    this._renderer = renderService.createRenderer(elementRef.nativeElement);
  }

  ngOnChanges (changes: SimpleChanges): void {
    this._renderer.changeClass(
      changes,
      (propName, change) => change.previousValue.toString().split(' ').map(value => this._getClass(propName, value)),
      (propName, change) => change.currentValue.toString().split(' ').map(value => this._getClass(propName, value)),
    );
  }

  ngOnInit (): void {
    if (this.isActive) { this.open(); }
  }

  toggle (): void {
    return this._isActive ? this.close() : this.open();
  }

  open (): void {
    this._isActive = true;
    this._renderer.addClass('ngx-Sidenav_state_active');
  }

  close (): void {
    this._isActive = false;
    this._renderer.removeClass('ngx-Sidenav_state_active');
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

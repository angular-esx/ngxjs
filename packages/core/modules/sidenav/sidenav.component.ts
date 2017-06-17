import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { NgxRendererService } from '../../services';


@Component({
  selector: 'ngx-sidenav',
  templateUrl: './templates/sidenav.html',
  styleUrls: ['./styles/index.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.ngx-Sidenav]': 'true',
  },
})
class NgxSidenavComponent implements OnChanges {
  // 'over', 'push', 'side'
  @Input() type: 'over' | 'push' | 'side' = 'over';
  @Input() opened: boolean = false;
  @Input() align: 'left' | 'right' = 'left';

  constructor (
    @Inject(ElementRef) private _elementRef: ElementRef,
    @Inject(NgxRendererService) private _renderer: NgxRendererService
  ) { }

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

  close() {
    this.opened = false;
    this._renderer.removeClass(this._elementRef.nativeElement, 'ngx-Sidenav_opened_true');
  }
}


export { NgxSidenavComponent };

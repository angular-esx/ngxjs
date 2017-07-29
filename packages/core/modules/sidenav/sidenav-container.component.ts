import {
  Component,
  OnInit,
  AfterContentChecked,
  Output,
  EventEmitter,
  QueryList,
  ContentChildren,
  HostListener,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
} from '@angular/core';

import { NgxBrowserPlatformService } from '../../services';

import { NgxSidenavComponent } from './sidenav.component';


@Component({
  selector: 'ngx-sidenav-container',
  templateUrl: './templates/sidenav-container.html',
  styleUrls: ['./styles/sidenav-container/index.scss'],
  host: {
    class: 'ngx-SidenavContainer',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'ngxSidenavContainer',
})
class NgxSidenavContainerComponent implements OnInit, AfterContentChecked {
  private _mainContentClass: string;
  private _backdropClass: string;

  @ContentChildren(NgxSidenavComponent)
  private _sidenavs: QueryList<NgxSidenavComponent>;

  @Output('onResize') resizeEmitter = new EventEmitter<{ width: number, height: number }>();


  constructor (
    @Inject(ChangeDetectorRef) private _changeDetectorRef: ChangeDetectorRef,
    @Inject(NgxBrowserPlatformService) private _browserPlatformService: NgxBrowserPlatformService
  ) {}


  ngOnInit (): void {
    this._emitWindowResizedEvent();
  }

  ngAfterContentChecked (): void {
    const result = this._checkChanges();

    if (result.hasChanges) {
      this._mainContentClass = result.mainContentClass;
      this._backdropClass = result.backdropClass;

      this._changeDetectorRef.markForCheck();
    }
  }

  closeAllSidenavs (): void {
    this._sidenavs.forEach((sidenav) => {
      sidenav.close();
    });
  }

  @HostListener('window:resize')
  private _emitWindowResizedEvent (): void {
    if (this._browserPlatformService.isBrowser) {
      this.resizeEmitter.next({
        width: this._browserPlatformService.window.innerWidth,
        height: this._browserPlatformService.window.innerHeight,
      });
    }
  }

  private _checkChanges (): {
    hasChanges: boolean,
    mainContentClass: string,
    backdropClass: string,
  } {
    const result = {
      hasChanges: false,
      mainContentClass: 'ngx-SidenavContainer__MainContent',
      backdropClass: 'ngx-SidenavContainer__Backdrop',
    };

    const _backdropClass = {
      isActive: false,
      hasBackgroundColor: false,
    };

    this._sidenavs.forEach((sidenav) => {
      if (sidenav.isActive) {
        result.mainContentClass += ` ngx-SidenavContainer__MainContent_mode_${sidenav.type}-${sidenav.align}`;

        _backdropClass.isActive = sidenav.type === 'over' || sidenav.type === 'push';
        _backdropClass.hasBackgroundColor = sidenav.type === 'over';
      }
    });

    result.hasChanges = this._mainContentClass !== result.mainContentClass;

    if (result.hasChanges) {
      if (_backdropClass.isActive) {
        result.backdropClass += ' ngx-SidenavContainer__Backdrop_state_active';
      }
      if (_backdropClass.hasBackgroundColor) {
        result.backdropClass += ' ngx-SidenavContainer__Backdrop_variant_black';
      }
    }

    return result;
  }
}


export { NgxSidenavContainerComponent };

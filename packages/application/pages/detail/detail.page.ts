/* tslint:disable: component-class-suffix */
import {
  Component,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  ViewEncapsulation,
  Inject,
} from '@angular/core';

import {
  DenseDetailComponent,
  EnglishDetailComponent,
  TallDetailComponent,
} from './modules';


@Component({
  selector: 'ngx-detail-page',
  templateUrl: './templates/detail.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-DetailPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class DetailPage implements AfterViewInit {
  private _activeDetail: string;
  private _detailComponentRef: ComponentRef<any>;

  @ViewChild('detailContainer', { read: ViewContainerRef })
  _detailViewContainerRef: ViewContainerRef;


  constructor (@Inject(ComponentFactoryResolver) private _componentResolver: ComponentFactoryResolver) {}

  ngAfterViewInit (): void {
    this._display('english-detail');
  }

  _display (detail): void {
    if (this._activeDetail === detail) { return; }

    this._activeDetail = detail;

    if (this._detailComponentRef) { this._detailComponentRef.destroy(); }

    let _detailComponent;
    switch (this._activeDetail) {
      case 'dense-detail':
        _detailComponent = DenseDetailComponent;
        break;
      case 'english-detail':
        _detailComponent = EnglishDetailComponent;
        break;
      case 'tall-detail':
        _detailComponent = TallDetailComponent;
        break;
    }

    this._detailComponentRef = this._detailViewContainerRef.createComponent(
      this._componentResolver.resolveComponentFactory(_detailComponent),
      this._detailViewContainerRef.length,
    );
  }
}


export { DetailPage };

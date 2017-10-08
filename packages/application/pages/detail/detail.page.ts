/* tslint:disable: component-class-suffix */
import {
  Component,
  AfterContentInit,
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
class DetailPage implements AfterContentInit {
  private _detailComponentRef: ComponentRef<any>;

  activeDetail: string;

  @ViewChild('detailContainer', { read: ViewContainerRef })
  _detailViewContainerRef: ViewContainerRef;


  constructor (@Inject(ComponentFactoryResolver) private _componentResolver: ComponentFactoryResolver) {}

  ngAfterContentInit (): void {
    this._display('english-detail');
  }

  _display (detail): void {
    if (this.activeDetail === detail) { return; }

    this.activeDetail = detail;

    if (this._detailComponentRef) { this._detailComponentRef.destroy(); }

    let _detailComponent;
    switch (this.activeDetail) {
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

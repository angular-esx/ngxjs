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
  DenseListComponent,
  EnglishListComponent,
  TallListComponent,
} from './modules';


@Component({
  selector: 'ngx-list-page',
  templateUrl: './templates/list.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-ListPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class ListPage implements AfterViewInit {
  private _listComponentRef: ComponentRef<any>;

  activeList: string;

  @ViewChild('listContainer', { read: ViewContainerRef })
  _listViewContainerRef: ViewContainerRef;


  constructor (@Inject(ComponentFactoryResolver) private _componentResolver: ComponentFactoryResolver) {}

  ngAfterViewInit (): void {
    this._display('english-list');
  }

  _display (list): void {
    if (this.activeList === list) { return; }

    this.activeList = list;

    if (this._listComponentRef) { this._listComponentRef.destroy(); }

    let _listComponent;
    switch (this.activeList) {
      case 'dense-list':
        _listComponent = DenseListComponent;
        break;
      case 'english-list':
        _listComponent = EnglishListComponent;
        break;
      case 'tall-list':
        _listComponent = TallListComponent;
        break;
    }

    this._listComponentRef = this._listViewContainerRef.createComponent(
      this._componentResolver.resolveComponentFactory(_listComponent),
      this._listViewContainerRef.length,
    );
  }
}


export { ListPage };

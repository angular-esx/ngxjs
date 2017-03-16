import {
  Component,
  ViewEncapsulation,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
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
class ListPage {
  _activeList;
  _listComponentRef;

  @ViewChild('listContainer', { read: ViewContainerRef })_listViewContainerRef;

  static parameters = [
    [new Inject(ComponentFactoryResolver)],
  ]
  constructor(componentResolver) {
    this._componentResolver = componentResolver;
  }

  ngAfterViewInit() {
    this._display('english-list');
  }

  _display(list) {
    if (this._activeList === list) { return; }

    this._activeList = list;

    if (this._listComponentRef) { this._listComponentRef.destroy(); }

    let _listComponent;
    switch (this._activeList) {
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

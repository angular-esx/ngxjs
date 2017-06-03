/* tslint:disable: component-class-suffix */
import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';


type _ItemType = { name: string };

@Component({
  selector: 'ngx-view-page',
  templateUrl: './templates/view.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-ViewPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class ViewPage implements OnInit {
  private _selectedItem: _ItemType;
  private _items: Array<_ItemType>;

  ngOnInit (): void {
    this._items = [];

    for (let index = 0; index < 100; index++) {
      this._items.push({ name: `Item ${index}` });
    }
  }

  _select (item) {
    this._selectedItem = item;
  }
}


export { ViewPage };

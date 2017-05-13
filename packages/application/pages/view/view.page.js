import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-view-page',
  templateUrl: './templates/view.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-ViewPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class ViewPage {
  ngOnInit() {
    this._items = [];

    for (let index = 0; index < 100; index++) {
      this._items.push({ name: `Item ${index}` });
    }
  }

  _select(item) {
    this._selectedItem = item;
  }
}


export { ViewPage };

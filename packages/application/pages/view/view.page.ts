/* tslint:disable: component-class-suffix */
import {
  Component,
  OnInit,
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
class ViewPage implements OnInit {
  selectedItem: { name: string };
  items: Array<{ name: string }>;

  ngOnInit (): void {
    this.items = [];

    for (let index = 0; index < 100; index++) {
      this.items.push({ name: `Item ${index}` });
    }
  }

  select (item?: { name: string }) {
    this.selectedItem = item;
  }
}


export { ViewPage };

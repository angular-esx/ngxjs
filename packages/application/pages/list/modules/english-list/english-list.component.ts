import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-english-list',
  templateUrl: './templates/english-list.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-EnglishListComponent]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class EnglishListComponent implements OnInit {
  private _dataSource: Array<{ name: string, contents: Array<string> }> = [];

  ngOnInit (): void {
    let _content = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ';
    _content += 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, ';
    _content += 'when an unknown printer took a galley of type and scrambled it to make a type specimen book.';
    let _item;

    for (let i = 0; i < 20; i++) {
      _item = {
        name: `Item ${i + 1}`,
        contents: [_content],
      };

      if (i % 2 === 0) { _item.contents.push(_content); }
      if (i % 3 === 0) { _item.contents.push(_content); }

      this._dataSource.push(_item);
    }
  }
}


export { EnglishListComponent };

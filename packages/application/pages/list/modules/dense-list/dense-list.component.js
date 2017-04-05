import {
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-dense-list',
  templateUrl: './templates/dense-list.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-DenseListComponent]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class DenseListComponent {
  ngOnInit() {
    this._dataSource = [];
    let _content = 'Lorem Ipsumは印刷と植字業界の単純なダミーテキストです。';
    _content += 'Lorem Ipsumは、未知のプリンタがタイプのガレーを取り、それを型式の本を作るためにスクランブルした1500 ';
    _content += '年代以来、業界の標準的なダミーテキストでした';
    let _item;

    for (let i = 0; i < 20; i++) {
      _item = {
        name: `項目 ${i + 1}`,
        contents: [_content],
      };

      if (i % 2 === 0) { _item.contents.push(_content); }
      if (i % 3 === 0) { _item.contents.push(_content); }

      this._dataSource.push(_item);
    }
  }
}


export { DenseListComponent };

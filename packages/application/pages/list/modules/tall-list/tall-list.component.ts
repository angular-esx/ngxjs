import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ngx-tall-list',
  templateUrl: './templates/tall-list.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-TallListComponent]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class TallListComponent implements OnInit {
  private _dataSource: Array<{ name: string, contents: Array<string> }> = [];

  ngOnInit (): void {
    let _content = 'Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang phục vụ cho in ấn. ';
    _content += 'Lorem Ipsum đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm 1500, ';
    _content += 'khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để tạo thành một bản mẫu văn bản.';
    let _item;

    for (let i = 0; i < 20; i++) {
      _item = {
        name: `Danh mục ${i + 1}`,
        contents: [_content],
      };

      if (i % 2 === 0) { _item.contents.push(_content); }
      if (i % 3 === 0) { _item.contents.push(_content); }

      this._dataSource.push(_item);
    }
  }
}


export { TallListComponent };

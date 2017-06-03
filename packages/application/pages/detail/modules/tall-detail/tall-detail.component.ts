import { Component } from '@angular/core';


@Component({
  selector: 'ngx-tall-detail',
  templateUrl: './templates/tall-detail.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-TallDetailComponent]': 'true',
  }
})
class TallDetailComponent {}


export { TallDetailComponent };

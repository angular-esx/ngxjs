import { Component } from '@angular/core';


@Component({
  selector: 'ngx-dense-detail',
  templateUrl: './templates/dense-detail.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-DenseDetailComponent]': 'true',
  }
})
class DenseDetailComponent {}


export { DenseDetailComponent };

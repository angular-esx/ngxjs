import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgxContainerModule,
  NgxTypographyModule,
} from 'ngx-core';

import { TallDetailComponent } from './tall-detail.component';


@NgModule({
  imports: [
    CommonModule,
    NgxContainerModule,
    NgxTypographyModule,
  ],
  declarations: [TallDetailComponent],
  entryComponents: [TallDetailComponent],
  exports: [TallDetailComponent],
})
class TallDetailModule {}


export { TallDetailModule };

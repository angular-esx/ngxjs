import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgxContainerModule,
  NgxTypographyModule,
} from 'ngx-core';

import { DenseDetailComponent } from './dense-detail.component';


@NgModule({
  imports: [
    CommonModule,
    NgxContainerModule,
    NgxTypographyModule,
  ],
  declarations: [DenseDetailComponent],
  entryComponents: [DenseDetailComponent],
  exports: [DenseDetailComponent],
})
class DenseDetailModule {}


export { DenseDetailModule };

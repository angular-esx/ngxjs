import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgxContainerModule,
  NgxTypographyModule,
} from 'ngx-core';

import { EnglishDetailComponent } from './english-detail.component';


@NgModule({
  imports: [
    CommonModule,
    NgxContainerModule,
    NgxTypographyModule,
  ],
  declarations: [EnglishDetailComponent],
  entryComponents: [EnglishDetailComponent],
  exports: [EnglishDetailComponent],
})
class EnglishDetailModule {}


export { EnglishDetailModule };

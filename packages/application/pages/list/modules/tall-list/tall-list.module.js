import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TallListComponent } from './tall-list.component';


@NgModule({
  imports: [CommonModule],
  declarations: [TallListComponent],
  entryComponents: [TallListComponent],
  exports: [TallListComponent],
})
class TallListModule {}


export { TallListModule };

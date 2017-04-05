import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DenseListComponent } from './dense-list.component';


@NgModule({
  imports: [CommonModule],
  declarations: [DenseListComponent],
  entryComponents: [DenseListComponent],
  exports: [DenseListComponent],
})
class DenseListModule {}


export { DenseListModule };

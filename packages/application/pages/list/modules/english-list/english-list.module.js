import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnglishListComponent } from './english-list.component';


@NgModule({
  imports: [CommonModule],
  declarations: [EnglishListComponent],
  entryComponents: [EnglishListComponent],
  exports: [EnglishListComponent],
})
class EnglishListModule {}


export { EnglishListModule };

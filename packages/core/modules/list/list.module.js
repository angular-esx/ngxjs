import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxListComponent } from './list.component';

const _DIRECTIVES = [NgxListComponent];

@NgModule({
  id: 'ngx-list',
  imports: [CommonModule],
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
class NgxListModule {}


export { NgxListModule };

import { NgModule } from '@angular/core';

import { NgxRenderServiceModule } from '../../services';
import { NgxGridColumnComponent } from './grid-column.component';
import { NgxGridRowComponent } from './grid-row.component';
import { NgxGridComponent } from './grid.component';


const _DIRECTIVES = [
  NgxGridColumnComponent,
  NgxGridRowComponent,
  NgxGridComponent,
];

@NgModule({
  id: 'ngx-grid',
  imports: [NgxRenderServiceModule],
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
export class NgxGridModule {}

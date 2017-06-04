import { NgModule } from '@angular/core';

import { NgxGridColumnComponent } from './grid-column.component';
import { NgxGridRowComponent } from './grid-row.component';
import { NgxGridComponent } from './grid.component';
import { NgxRendererModule } from '../renderer';

@NgModule({
  id: 'ngx-grid',
  declarations: [
    NgxGridColumnComponent,
    NgxGridRowComponent,
    NgxGridComponent,
  ],
  exports: [
    NgxGridColumnComponent,
    NgxGridRowComponent,
    NgxGridComponent,
  ],
  imports: [
    NgxRendererModule
  ]
})
class NgxGridModule {}


export { NgxGridModule };

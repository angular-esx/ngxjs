import { NgModule } from '@angular/core';

import { NgxRenderServiceModule } from '../../services';
import { NgxGridColumnComponent } from './grid-column.component';
import { NgxGridRowComponent } from './grid-row.component';
import { NgxGridComponent } from './grid.component';


@NgModule({
  id: 'ngx-grid',
  imports: [NgxRenderServiceModule],
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
})
class NgxGridModule {}


export { NgxGridModule };

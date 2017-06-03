import { NgModule } from '@angular/core';

import { NgxViewComponent } from './view.component';


@NgModule({
  id: 'ngx-view',
  declarations: [NgxViewComponent],
  exports: [NgxViewComponent],
})
class NgxViewModule {}


export { NgxViewModule };

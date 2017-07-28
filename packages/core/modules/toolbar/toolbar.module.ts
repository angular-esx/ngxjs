import { NgModule } from '@angular/core';

import { NgxToolbarComponent } from './toolbar.component';


@NgModule({
  id: 'ngx-toolbar',
  declarations: [NgxToolbarComponent],
  exports: [NgxToolbarComponent],
})
class NgxToolbarModule {}


export { NgxToolbarModule };

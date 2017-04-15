import { NgModule } from '@angular/core';

import { NgxToolbarComponent } from './toolbar.component';


const _DIRECTIVES = [NgxToolbarComponent];

@NgModule({
  id: 'ngx-toolbar',
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
class NgxToolbarModule {}


export { NgxToolbarModule };

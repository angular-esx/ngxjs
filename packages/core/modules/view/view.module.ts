import { NgModule } from '@angular/core';

import { NgxViewComponent } from './view.component';


const _DIRECTIVES = [NgxViewComponent];

@NgModule({
  id: 'ngx-view',
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
export class NgxViewModule {}

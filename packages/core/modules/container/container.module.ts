import { NgModule } from '@angular/core';

import { NgxContainerComponent } from './container.component';


const _DIRECTIVES = [NgxContainerComponent];

@NgModule({
  id: 'ngx-container',
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
export class NgxContainerModule {}

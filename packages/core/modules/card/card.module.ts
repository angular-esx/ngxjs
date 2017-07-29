import {
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { NgxCardComponent } from './card.component';


const _DIRECTIVES = [NgxCardComponent];

@NgModule({
  id: 'ngx-card',
  declarations: _DIRECTIVES,
  schemas: [NO_ERRORS_SCHEMA],
  exports: _DIRECTIVES,
})
class NgxCardModule {}


export { NgxCardModule };

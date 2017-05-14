import { NgModule } from '@angular/core';

import { NgxContainerComponent } from './container.component';


@NgModule({
  id: 'ngx-container',
  declarations: [NgxContainerComponent],
  exports: [NgxContainerComponent],
})
class NgxContainerModule {}


export { NgxContainerModule };

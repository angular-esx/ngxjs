import { NgModule } from '@angular/core';

import { NgxRenderService } from './render';


@NgModule({
  id: 'ngx-service',
  providers: [NgxRenderService],
})
class NgxServiceModule {}


export { NgxServiceModule };

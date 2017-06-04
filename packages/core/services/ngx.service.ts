import { NgModule } from '@angular/core';

import { NgxRendererService } from './renderer';


@NgModule({
  id: 'ngx-service',
  providers: [NgxRendererService],
})
class NgxServiceModule {}


export { NgxServiceModule };

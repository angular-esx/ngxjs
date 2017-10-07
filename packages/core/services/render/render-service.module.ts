import { NgModule } from '@angular/core';

import { ngxRenderServiceProvider } from './render.service';


@NgModule({
  id: 'ngx-render-service',
  providers: [ngxRenderServiceProvider],
})
export class NgxRenderServiceModule {}

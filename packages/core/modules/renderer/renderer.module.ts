import { NgModule } from '@angular/core';

import { NgxRendererService } from './renderer.service';


@NgModule({
  id: 'ngx-renderer',
  providers: [NgxRendererService]
})
class NgxRendererModule {}


export { NgxRendererModule };

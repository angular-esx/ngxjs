import { NgModule } from '@angular/core';

import { NgxTypographyModule } from 'ngx-core';

import { DenseScriptComponent } from './dense-script.component';


@NgModule({
  imports: [NgxTypographyModule],
  declarations: [DenseScriptComponent],
  entryComponents: [DenseScriptComponent],
  exports: [DenseScriptComponent],
})
class DenseScriptModule {}


export { DenseScriptModule };

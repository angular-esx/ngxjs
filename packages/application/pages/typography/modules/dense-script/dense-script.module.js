import { NgModule } from '@angular/core';

import { ngxTypographyModule } from 'ngx-core';

import { DenseScriptComponent } from './dense-script.component';


@NgModule({
  imports: [ngxTypographyModule],
  declarations: [DenseScriptComponent],
  entryComponents: [DenseScriptComponent],
  exports: [DenseScriptComponent],
})
class DenseScriptModule {}


export { DenseScriptModule };

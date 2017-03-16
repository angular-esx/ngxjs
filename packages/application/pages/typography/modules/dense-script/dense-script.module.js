import { NgModule } from '@angular/core';

import { DenseScriptComponent } from './dense-script.component';


@NgModule({
  declarations: [DenseScriptComponent],
  entryComponents: [DenseScriptComponent],
  exports: [DenseScriptComponent],
})
class DenseScriptModule {}


export { DenseScriptModule };

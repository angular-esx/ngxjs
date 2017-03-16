import { NgModule } from '@angular/core';

import { TallScriptComponent } from './tall-script.component';


@NgModule({
  declarations: [TallScriptComponent],
  entryComponents: [TallScriptComponent],
  exports: [TallScriptComponent],
})
class TallScriptModule {}


export { TallScriptModule };

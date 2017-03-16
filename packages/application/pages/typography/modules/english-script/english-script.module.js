import { NgModule } from '@angular/core';

import { EnglishScriptComponent } from './english-script.component';


@NgModule({
  declarations: [EnglishScriptComponent],
  entryComponents: [EnglishScriptComponent],
  exports: [EnglishScriptComponent],
})
class EnglishScriptModule {}


export { EnglishScriptModule };

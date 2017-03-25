import { NgModule } from '@angular/core';

import { ngxTypographyModule } from 'ngx-core';

import { EnglishScriptComponent } from './english-script.component';


@NgModule({
  imports: [ngxTypographyModule],
  declarations: [EnglishScriptComponent],
  entryComponents: [EnglishScriptComponent],
  exports: [EnglishScriptComponent],
})
class EnglishScriptModule {}


export { EnglishScriptModule };

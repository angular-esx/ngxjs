import { NgModule } from '@angular/core';

import { NgxTypographyModule } from 'ngx-core';

import { EnglishScriptComponent } from './english-script.component';


@NgModule({
  imports: [NgxTypographyModule],
  declarations: [EnglishScriptComponent],
  entryComponents: [EnglishScriptComponent],
  exports: [EnglishScriptComponent],
})
class EnglishScriptModule {}


export { EnglishScriptModule };

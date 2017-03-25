import { NgModule } from '@angular/core';

import { ngxTypographyModule } from 'ngx-core';

import { TallScriptComponent } from './tall-script.component';


@NgModule({
  imports: [ngxTypographyModule],
  declarations: [TallScriptComponent],
  entryComponents: [TallScriptComponent],
  exports: [TallScriptComponent],
})
class TallScriptModule {}


export { TallScriptModule };

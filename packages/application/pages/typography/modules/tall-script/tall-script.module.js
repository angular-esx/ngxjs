import { NgModule } from '@angular/core';

import { NgxTypographyModule } from 'ngx-core';

import { TallScriptComponent } from './tall-script.component';


@NgModule({
  imports: [NgxTypographyModule],
  declarations: [TallScriptComponent],
  entryComponents: [TallScriptComponent],
  exports: [TallScriptComponent],
})
class TallScriptModule {}


export { TallScriptModule };

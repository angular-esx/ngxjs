
import { NgModule } from '@angular/core';

import { NgxTemplatePortalDirective } from './template-portal.directive';
import { NgxPortalHostDirective } from './portal-host.directive';


@NgModule({
  id: 'ngx-portal',
  declarations: [NgxTemplatePortalDirective, NgxPortalHostDirective],
  exports: [NgxTemplatePortalDirective, NgxPortalHostDirective],
})
class NgxPortalModule {}


export { NgxPortalModule };

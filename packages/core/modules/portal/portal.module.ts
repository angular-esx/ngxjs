
import { NgModule } from '@angular/core';

import { NgxTemplatePortalDirective } from './template-portal.directive';
import { NgxPortalHostDirective } from './portal-host.directive';


const _DIRECTIVES = [
  NgxTemplatePortalDirective,
  NgxPortalHostDirective,
];

@NgModule({
  id: 'ngx-portal',
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
class NgxPortalModule {}


export { NgxPortalModule };

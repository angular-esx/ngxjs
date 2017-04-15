import { NgModule } from '@angular/core';

import { NgxSideNavComponent } from './side-nav.component';


const _DIRECTIVES = [NgxSideNavComponent];

@NgModule({
  id: 'ngx-side-nav',
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
class NgxSideNavModule {}


export { NgxSideNavModule };

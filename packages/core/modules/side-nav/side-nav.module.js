import { NgModule } from '@angular/core';

import { NgxSideNavComponent } from './side-nav.component';
import { NgxSideNavContainerComponent } from './side-nav-container.component';
import { NgxSideNavContentComponent } from './side-nav-content.component';

const _DIRECTIVES = [NgxSideNavComponent, NgxSideNavContainerComponent, NgxSideNavContentComponent];

@NgModule({
  id: 'ngx-side-nav',
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
class NgxSideNavModule {}


export { NgxSideNavModule };

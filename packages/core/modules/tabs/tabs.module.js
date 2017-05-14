import { NgModule } from '@angular/core';

import { NgxTabsComponent } from './tabs.component';


const _DIRECTIVES = [NgxTabsComponent];

@NgModule({
  id: 'ngx-tabs',
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
class NgxTabsModule {}


export { NgxTabsModule };

import { NgModule } from '@angular/core';

import { NgxSidenavComponent } from './sidenav.component';


@NgModule({
  id: 'ngx-sidenav',
  declarations: [
    NgxSidenavComponent,
  ],
  exports: [
    NgxSidenavComponent,
  ],
})
class NgxSidenavModule {}


export { NgxSidenavModule };

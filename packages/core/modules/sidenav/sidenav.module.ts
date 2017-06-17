import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSidenavComponent } from './sidenav.component';
import { NgxSidenavContainerComponent } from './sidenav-container.component';
import { NgxSidenavContentComponent } from './sidenav-content.component';

const DIRECTIVES = [
  NgxSidenavComponent,
  NgxSidenavContainerComponent,
  NgxSidenavContentComponent,
];

@NgModule({
  id: 'ngx-sidenav',
  imports: [CommonModule],
  declarations: DIRECTIVES,
  exports: DIRECTIVES,
})
class NgxSidenavModule { }


export { NgxSidenavModule };

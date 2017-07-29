import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSidenavContainerComponent } from './sidenav-container.component';
import { NgxSidenavComponent } from './sidenav.component';
import { NgxSidenavItemComponent } from './sidenav-item.component';


const DIRECTIVES = [
  NgxSidenavContainerComponent,
  NgxSidenavComponent,
  NgxSidenavItemComponent,
];

@NgModule({
  id: 'ngx-sidenav',
  imports: [CommonModule],
  declarations: DIRECTIVES,
  exports: DIRECTIVES,
})
class NgxSidenavModule { }


export { NgxSidenavModule };

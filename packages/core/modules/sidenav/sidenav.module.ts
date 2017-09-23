import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgxBrowserPlatformServiceModule,
  NgxRenderServiceModule,
} from '../../services';
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
  imports: [
    CommonModule,
    NgxBrowserPlatformServiceModule,
    NgxRenderServiceModule,
  ],
  declarations: DIRECTIVES,
  exports: DIRECTIVES,
})
class NgxSidenavModule { }


export { NgxSidenavModule };

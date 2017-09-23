import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgxBrowserPlatformServiceModule,
  NgxRenderServiceModule,
} from '../../services';
import { NgxSidenavContainerComponent } from './sidenav-container.component';
import { NgxSidenavComponent } from './sidenav.component';
import { NgxSidenavItemComponent } from './sidenav-item.component';


const _DIRECTIVES = [
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
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
export class NgxSidenavModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxOverlayModule } from '../overlay';

import { MenuComponent } from './menu.component';
import { MenuItemDirective } from './menu-item.directive';
import { MenuTriggerDirective } from './menu-trigger.directive';


const _DIRECTIVES = [
  MenuComponent,
  MenuItemDirective,
  MenuTriggerDirective,
];
@NgModule({
  id: 'ngx-menu',
  imports: [
    CommonModule,
    NgxOverlayModule,
    // BrowserAnimationsModule,
  ],
  declarations: _DIRECTIVES,
  exports: _DIRECTIVES,
})
export class MenuModule {}

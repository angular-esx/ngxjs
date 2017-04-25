/* eslint-disable no-param-reassign, import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxCardModule } from './card';
import { NgxGridModule } from './grid';
import { NgxListModule } from './list';
import { NgxSideNavModule } from './side-nav';
import { NgxTabsModule } from './tabs';
import { NgxToolbarModule } from './toolbar';
import { NgxTypographyModule } from './typography';

@NgModule({
  imports: [
    BrowserModule,
    NgxCardModule,
    NgxGridModule,
    NgxListModule,
    NgxSideNavModule,
    NgxTabsModule,
    NgxToolbarModule,
    NgxTypographyModule,
  ],
  exports: [
    NgxCardModule,
    NgxGridModule,
    NgxListModule,
    NgxSideNavModule,
    NgxTabsModule,
    NgxToolbarModule,
    NgxTypographyModule,
  ],
})
export class NgxjsModule {}

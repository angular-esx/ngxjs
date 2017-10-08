/* eslint-disable no-param-reassign, import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpTransferModule } from '@ngx-universal/state-transfer';

import {
  CardPageModule,
  ContainerPageModule,
  DetailPageModule,
  GridPageModule,
  LayoutCardPageModule,
  ListPageModule,
  OverlayPageModule,
  PortalPageModule,
  SidenavPageModule,
  ThemePageModule,
  TypographyPageModule,
  ViewPageModule,
} from '../pages';
import { AppRouteModule } from './route';
import { NgxApp } from './_app';


@NgModule({
  imports: [
    BrowserModule,
    HttpTransferModule.forRoot(),

    CardPageModule,
    ContainerPageModule,
    DetailPageModule,
    GridPageModule,
    LayoutCardPageModule,
    ListPageModule,
    OverlayPageModule,
    PortalPageModule,
    SidenavPageModule,
    ThemePageModule,
    TypographyPageModule,
    ViewPageModule,

    AppRouteModule,
  ],
  declarations: [NgxApp],
  bootstrap: [NgxApp],
})
class NgxAppModule {}


export { NgxAppModule };

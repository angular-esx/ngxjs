/* eslint-disable no-param-reassign, import/no-extraneous-dependencies */
import {
  removeNgStyles,
  createNewHosts,
} from '@angularclass/hmr';
import {
  NgModule,
  ApplicationRef,
  Inject,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxServiceModule } from 'ngx-core';

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
    NgxServiceModule,
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
class NgxAppModule {
  constructor (@Inject(ApplicationRef) private _appRef: ApplicationRef) {}

  hmrOnInit (store): void { return; }

  hmrOnDestroy (store): void {
    const cmpLocation = this._appRef.components.map(cmp => cmp.location.nativeElement);
    store.disposeOldHosts = createNewHosts(cmpLocation);

    removeNgStyles();
  }

  hmrAfterDestroy (store): void {
    store.disposeOldHosts();

    delete store.disposeOldHosts;
  }
}


export { NgxAppModule };

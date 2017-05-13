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

import {
  DetailPageModule,
  ListPageModule,
  TypographyPageModule,
  ElevationPageModule,
  BreakpointPageModule,
  ColorPageModule,
  ContainerPageModule,
  ThemePageModule,
  GridPageModule,
  LayoutGridModule,
  LayoutListModule,
  LayoutCardModule,
  LayoutTabsModule,
  ViewPageModule,
} from '../pages';
import { AppRouteModule } from './route';
import { NgxApp } from './app';

@NgModule({
  imports: [
    BrowserModule,
    DetailPageModule,
    ListPageModule,
    TypographyPageModule,
    ColorPageModule,
    ContainerPageModule,
    ThemePageModule,
    ElevationPageModule,
    BreakpointPageModule,
    GridPageModule,
    LayoutGridModule,
    LayoutListModule,
    LayoutCardModule,
    LayoutTabsModule,
    ViewPageModule,
    // import your module above this AppRouteModule
    AppRouteModule,
  ],
  declarations: [NgxApp],
  bootstrap: [NgxApp],
})
class NgxAppModule {
  static parameters = [
    [new Inject(ApplicationRef)],
  ]

  constructor(appRef) {
    this._appRef = appRef;
  }

  hmrOnInit(store) {}

  hmrOnDestroy(store) {
    const cmpLocation = this._appRef.components.map(cmp => cmp.location.nativeElement);
    store.disposeOldHosts = createNewHosts(cmpLocation);

    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    store.disposeOldHosts();

    delete store.disposeOldHosts;
  }
}


export { NgxAppModule };

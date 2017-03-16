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
  ElevationPageModule,
} from '../pages';
import { AppRouteModule } from './route';
import { ngxApp } from './app';


@NgModule({
  imports: [
    BrowserModule,
    DetailPageModule,
    ListPageModule,
    AppRouteModule,
    ElevationPageModule,
  ],
  declarations: [ngxApp],
  bootstrap: [ngxApp],
})
class ngxAppModule {
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


export { ngxAppModule };

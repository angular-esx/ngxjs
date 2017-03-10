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
} from '../pages';
import { AppRouteModule } from './route';
import { ngxApp } from './app';


@NgModule({
  id: 'ngx-app',
  imports: [
    BrowserModule,
    DetailPageModule,
    ListPageModule,
    AppRouteModule,
  ],
  declarations: [ngxApp],
  bootstrap: [ngxApp],
})
class ngxAppModule {
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

ngxAppModule.parameters = [
  [new Inject(ApplicationRef)],
];


export { ngxAppModule };

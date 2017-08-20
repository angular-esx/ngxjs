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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxApp } from './_app';
import { NgxAppModule } from './_app.module';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgxAppModule,
  ],
  bootstrap: [NgxApp],
})
class NgxHmrAppModule {
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


export { NgxHmrAppModule };

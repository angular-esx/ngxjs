import {
  NgModule,
  Inject,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  ServerStateTransferModule,
  StateTransferService,
} from '@ngx-universal/state-transfer';

import { NgxApp } from './_app';
import { NgxAppModule } from './_app.module';


@NgModule({
  imports: [
    BrowserModule.withServerTransition({
      appId: 'ngx-app'
    }),
    ServerStateTransferModule.forRoot(),
    NoopAnimationsModule,
    ServerModule,
    NgxAppModule,
  ],
  bootstrap: [NgxApp],
})
class NgxServerAppModule {
  constructor (@Inject(StateTransferService) private _stateTransferService: StateTransferService) {}

  ngOnBootstrap = () => {
    this._stateTransferService.inject();
  }
}


export { NgxServerAppModule };

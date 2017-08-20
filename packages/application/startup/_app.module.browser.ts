import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserStateTransferModule } from '@ngx-universal/state-transfer';

import { NgxApp } from './_app';
import { NgxAppModule } from './_app.module';


@NgModule({
  imports: [
    BrowserModule.withServerTransition({
      appId: 'ngx-app'
    }),
    BrowserStateTransferModule.forRoot(),
    BrowserAnimationsModule,
    NgxAppModule,
  ],
  bootstrap: [NgxApp],
})
class NgxBrowserAppModule {}


export { NgxBrowserAppModule };

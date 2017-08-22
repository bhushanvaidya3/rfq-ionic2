import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";

import { MyApp } from './app.component';
import { RFQDashboardPage, RfqSearchPage, CreateRfqPage, ViewRfqPage, ViewRfqDetailsPage, ProductSearchPage } from "../pages/pages";
import { RfqApi } from "../shared/shared";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    RFQDashboardPage,
    RfqSearchPage,
    CreateRfqPage,
    ViewRfqPage,
    ViewRfqDetailsPage,
    ProductSearchPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RFQDashboardPage,
    RfqSearchPage,
    CreateRfqPage,
    ViewRfqPage,
    ViewRfqDetailsPage,
    ProductSearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RfqApi,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

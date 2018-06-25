import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OnixjsProvider } from '../providers/onixjs/onixjs';
import { NgxQRCodeModule } from 'ngx-qrcode3';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QRCodeModule } from 'angular2-qrcode';
import { MnemonicPage } from '../pages/mnemonic/mnemonic';
import { PinPage } from '../pages/pin/pin';



@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    MnemonicPage,
    PinPage
  ],
  imports: [ 
    BrowserModule, 
    NgxQRCodeModule,   
    QRCodeModule,
    IonicModule.forRoot(MyApp), 
    IonicStorageModule.forRoot() 
  ],

  bootstrap: [IonicApp], 
  entryComponents: [
    MyApp,
    HomePage,
    MnemonicPage,
    PinPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OnixjsProvider,
    BarcodeScanner
  ]
})
export class AppModule {}

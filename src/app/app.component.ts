import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MnemonicPage } from '../pages/mnemonic/mnemonic';
import { Storage } from '@ionic/storage';
import { PinPage } from '../pages/pin/pin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any ;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    platform.ready().then(() => {

      this.storage.get('mnemonic').then((strseed) => {
        if (strseed == null || typeof(strseed) == undefined){
          this.rootPage = MnemonicPage;
        }else{
          this.rootPage = PinPage;
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


    });
  }
}


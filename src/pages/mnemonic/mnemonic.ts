import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import bip39 from 'bip39';
import { PinPage } from '../pin/pin';
import { Storage } from '@ionic/storage';
  

/**  
 * Generated class for the MnemonicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mnemonic',
  templateUrl: 'mnemonic.html', 
})
export class MnemonicPage {
  mnemonic:string;
  next=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastController, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MnemonicPage');
  }

  generateNewSeed(){
    this.mnemonic = bip39.generateMnemonic()
    this.next = false;
  }
  nextConfig(){
    if (this.mnemonic == ''){
      this.next = true;
      this.presentToast();
      return false;
    }
    this.storage.set('mnemonic', this.mnemonic);
    this.navCtrl.setRoot(PinPage);
  }

  presentToast() {
    let toast = this.toast.create({
      message: 'The recovery phrase is invalid',
      duration: 6500,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}

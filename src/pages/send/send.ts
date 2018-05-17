import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnixjsProvider } from '../../providers/onixjs/onixjs';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home'

/**
 * Generated class for the SendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {
  init: any;
  addr: any;
  contador = 0;
  balance = 0;
  entrada = false;

  wallet: any;
  amount: 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private onix: OnixjsProvider) {
 
  }

  ionViewDidLoad() {
    //this.init = ;
    this.storage.get('configuracion').then((val)=>{
        this.init = val;
      console.log('done');
    });
    this.storage.get('balance').then((balance) => {
      this.balance = balance;
      console.log('done2');
    });
  }

  sendCoins() {
   this.onix.sendTransaction(this.amount, this.wallet, this.balance).then((Response)=>{
    console.log(Response);  
    this.onix.sendInApi(Response).then(resp => {
        console.log(resp);
        this.navCtrl.setRoot(HomePage);
    });
   }).catch(e=>{
     console.log(e);
   });
  }

}

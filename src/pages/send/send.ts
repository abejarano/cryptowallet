import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnixjsProvider } from '../../providers/onixjs/onixjs';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { empty } from 'rxjs/Observer';

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
  objetoEnvios=[];
  
  wallet: any;
  amount: 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private onix: OnixjsProvider, private barcodeScanner: BarcodeScanner) {
 
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
          if(resp){ 
            this.storage.get('transacciones').then(respuesta=>{
              if(respuesta == null){
                this.storage.set('transacciones', { txid: resp.data.txid, wallet: this.wallet, amount: this.amount }); //guardar transaccion
              }else{
                respuesta.push({ txid: resp.data.txid, wallet: this.wallet, amount: this.amount });
                this.storage.set('transacciones', respuesta); //guardar transaccion
              }
            })
          }
       
        this.navCtrl.setRoot(HomePage);
    });
   }).catch(e=>{
     console.log(e);
   });
  }


  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log(barcodeData);
      this.wallet = barcodeData.text;
   

    }, (err) => {

      console.log('Error: ', err);
     
    });
  }

}

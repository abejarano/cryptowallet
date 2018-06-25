import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { OnixjsProvider } from '../../providers/onixjs/onixjs';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
 

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
  amount: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private onix: OnixjsProvider, private barcodeScanner: BarcodeScanner, private toast:ToastController) {
 
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.storage.get('balance').then((balance) => {
        this.balance = balance;
        console.log(this.balance);
      });
    }, 5000);
  }

  sendCoins() {
   this.onix.sendTransaction(this.amount, this.wallet, this.balance).then((Response)=>{
      this.onix.sendInApi(Response).then(resp => {
            if(resp){ 
              this.storage.get('transacciones').then((respuesta:any)=>{
                if(respuesta == null){
                  this.storage.set('transacciones', [{ txid: resp.data.txid, wallet: this.wallet, amount: this.amount }]); //guardar transaccion
                }else{
                  respuesta.push({ txid: resp.data.txid, wallet: this.wallet, amount: this.amount });
                  this.storage.set('transacciones', respuesta); //guardar transaccion
                }
              })
            }
          this.presentToast();
          this.navCtrl.setRoot(HomePage);
      });
   }).catch(e=>{
     console.log(e);
   });
  }


  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log(barcodeData);
      
      let str = barcodeData.text;
      var res = str.split(":", 2);
      if (res[0] == 'onixcoin') {
        let wallet = res[1].split('?', 2);
        let depositAddr = wallet[0]
        let amount1 = wallet[1].split('=', 2);
        let depositAmount = amount1[1];
        this.wallet = depositAddr;
        this.amount = depositAmount;
        console.log(depositAddr, depositAmount);
      } else{
        this.wallet = barcodeData.text;
      }



    }, (err) => {
      console.log('Error: ', err);
    });
  }

  presentToast() {
    let toast = this.toast.create({
      message: 'Coins were send successfully',
      duration: 4500,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}

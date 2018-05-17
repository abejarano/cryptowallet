import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OnixjsProvider } from '../../providers/onixjs/onixjs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  init:any;
  addr:any;
  contador=0;
  balance=0;
  entrada=false;

  wallet:any;
  amount:0;

  constructor(public navCtrl: NavController, private storage: Storage, private onix: OnixjsProvider) {
    //this.storage.set('configuracion', this.onix);

   
    this.getBalances(0, 'ext');
    
  }

  checkInternalAddress(inx){
    this.addr = this.onix.getKeyAddr(this.onix.getInternalAddr(inx));
    
  }
  checkExternalAddress(inx) {
    this.addr = this.onix.getKeyAddr(this.onix.getExternalAddr(inx));
    console.log(this.addr, 'catolce');
  }

  getBalances(value, type){ 
    
      if(type == 'ext'){
        this.checkExternalAddress(value);
      }else{
        this.checkInternalAddress(value); 
      }

      if (this.contador == 10) {
        this.contador = 0;
        if(!this.entrada){
          this.getBalances(0, 'int');
        }
        this.entrada = true;
      }else{
        
        this.onix.getBalancesAddr(this.addr).then(resp=>{ 
          
          if(resp.data.length == 0){
            //no existe balance y aumenta el contador

            this.contador ++
            this.getBalances(value + 1, type);
          }else{
            //existe banlance y se reseta el contador para que siga preguntando
              if (resp.data.length > 0) {
                for (let index = 0; index < resp.data.length; index++) {
                  this.balance += resp.data[index].amount;
                  //guardar la addrs que poseen fondos 
                  this.storage.set('balance', this.balance);
                  this.onix.AdrressInputsObject(resp.data[index]);
                }
             
              }
            this.contador = 0;
            this.getBalances(value + 1, type );        
          }
          
        });
      }
        
  }

  depositCoins(){
    this.navCtrl.setRoot('RecivePage');
  }
  sendCoins(){
    this.navCtrl.setRoot('SendPage');
  }
}
 
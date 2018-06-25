import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OnixjsProvider } from '../../providers/onixjs/onixjs';
import { Storage } from '@ionic/storage';
import { HeaderColor } from '@ionic-native/header-color';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  init:any;
  addr:any;
  contador=0;
  balance:any=0;
  entrada=false;
  principal:any;
  wallet:any;
  amount:0;
  trans:any;
  acumulador=0;
  saldo = 0;
  seed :any;
  balanceUSD:any;
  balanceVEF:any;


  constructor(public navCtrl: NavController, private storage: Storage, private onix: OnixjsProvider, private headerColor: HeaderColor, private statusBar: StatusBar) {
    this.headerColor.tint('#D32F2F');
    // let status bar overlay webview
    this.statusBar.overlaysWebView(true);

    // set status bar to white
    this.statusBar.backgroundColorByHexString('#D32F2F');

    this.onix.confingAccount().then(resp=>{
      if(resp){ 
        this.onix.RefreshAdrressInputsObject();
        this.seed = this.onix.mnemonic;
        this.getBalances(0,'ext');
        this.depositAdress();
      }
    })
  }

  ionViewDidLoad() { 
    this.getEstatus();
  }
  getEstatus(){ 
      setTimeout(() => {
        this.checkBalance(); 
        this.checkTrans();
        this.checkBalanceFiat();
      }, 5000);
  }
  checkTrans(){
    this.storage.get('transacciones').then((trans:any)=>{
      console.log(trans.typeof);
      if (trans.typeof == null && typeof(trans) == undefined ){
        console.log(123);
        this.trans = [];
        return false; 
      }
      this.trans = trans.reverse();
      
    });
  }
  checkBalance(){
      this.storage.get('balance').then(saldo => {
        if (typeof (saldo) != null && typeof(saldo) != undefined ){
            this.balance = saldo; 
          }
        this.checkBalanceFiat();
        console.log(saldo);
      });
  }
  depositAdress(){
    this.principal = this.onix.getKeyAddr(this.onix.getExternalAddr(0));
  }

  checkInternalAddress(inx){
    this.addr = this.onix.getKeyAddr(this.onix.getInternalAddr(inx));
   
  }
  
  checkExternalAddress(inx) {
    this.addr = this.onix.getKeyAddr(this.onix.getExternalAddr(inx));
  }
  checkBalanceFiat(){
    this.onix.apiPrecios().then((result)=>{
      this.balanceUSD = (result.data.USD * this.balance).toFixed(4);
      this.balanceVEF = (result.data.VEF * this.balance).toFixed(4);
    });
  }

  getBalances(value, type){ 
    console.log(value, type);

      if(type == 'ext'){
        this.checkExternalAddress(value);
      }else{
        this.checkInternalAddress(value); 
      } 

      if (this.contador == 15) {
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
                  console.log(this.acumulador, resp.data[index].amount);
                  this.acumulador = this.acumulador + resp.data[index].amount;
                  console.log(this.acumulador);
                  //guardar la addrs que poseen fondos 
                  this.onix.AdrressInputsObject(resp.data[index]);
                }
                this.storage.set('balance', this.acumulador); 
                this.contador = 0;
              }
            this.getBalances(value + 1, type );
            console.log(value, ' valor a ', type, ' ', this.addr);
                    
          }
        });
      } 
  }

  depositCoins(){
    this.navCtrl.push('RecivePage', { 'wallet': this.principal });
  }
  sendCoins(){
    this.navCtrl.push('SendPage');  
  }
}
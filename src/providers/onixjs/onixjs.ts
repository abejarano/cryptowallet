import { Injectable } from '@angular/core';
import bitcoin from 'bitcoinjs-lib'
import bip39 from 'bip39';
import sb from 'satoshi-bitcoin';
import axios from 'axios';
import { Storage } from '@ionic/storage';

@Injectable()
export class OnixjsProvider {
  mnemonic: any;
  root: any;
  seed: any;
  addrpoint: any;
  child: any;
  balance: 0;
  objAddr = [];
  objKeyPair = []; 
  onxnetwork = {
    mainet: {
      messagePrefix: '\x19unused:\n',
      bip32: {
        public: 0x049d7cb2,
        private: 0x049d7878
      },
      pubKeyHash: 0x4B,
      scriptHash: 0x05,
      wif: 0x80
    },
    testnet: {
      messagePrefix: '\x19x19unused:\n',
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      wif: 0xef
    }
  };

  constructor(private storage: Storage) {
   
  }
  confingAccount(){
    return new Promise((resolve, reject) => {
      try {
        //let strseed = "decline toe notable quote orphan captain pitch violin window unaware kick lion";
        this.storage.get('mnemonic').then((strseed) => {
          this.mnemonic = 'vague kangaroo garden social solve boy often shallow whale abuse gospel romance'//strseed;
          this.seed = bip39.mnemonicToSeed(this.mnemonic);
          this.root = bitcoin.HDNode.fromSeedBuffer(this.seed, this.onxnetwork.testnet);
          console.log( this.mnemonic )
          resolve(true);
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  getInternalAddr(index) {
    return ("m/44'/1'/0'/1/"+index);
  }

  getExternalAddr(index) {
    return ("m/44'/1'/0'/0/"+index);
  }

  setpath(path) {
    this.child = this.root.derivePath(path);
  }

  getKeyAddr(path) {
    console.log('done3')
    this.setpath(path);
    this.addrpoint = this.child.getAddress();
    //this.objKeyPairGenerator();//llamar a esta funcion para almacenar estos valores antes que fn getKeyAddr() sea invocada nuevamente
    return this.addrpoint;
  }

  //almacenar llaves pvt para su respectiva llave pbl
  objKeyPairGenerator() {
    this.objKeyPair.push({ addr: this.addrpoint, pvtKey: this.child.keyPair })
   // this.storage.set('pvkey', this.objKeyPair);
  }
  RefreshAdrressInputsObject(){
      this.objAddr = [];
      this.objKeyPair = [];
  }

  AdrressInputsObject(addr){
    
    this.objKeyPairGenerator();
    this.objAddr.push({ txid: addr.txid, txvout: addr.vout, pvtKey: this.child.keyPair});
/*  
    this.storage.set('inputs', this.objAddr);
    this.storage.get('inputs').then((resp) => {
      console.log(resp);
    });
    */
  }

  sendTransaction(gasto, walletpago, balance) { 
    
    console.log(this.objAddr, this.objKeyPair);
    return new Promise((resolve, reject) => {
      try{ 
        
        var tx = new bitcoin.TransactionBuilder(this.onxnetwork.testnet);
        
        //se agregan los inpts necesarios para las biteras de pagos y para las billeteras de cambio;
        for (const input of this.objAddr) { //llamo a la propieda objAddr que tiene las wallets con fondos para enviar
          tx.addInput(input.txid, input.txvout);
        } 
          //formula de calculo
          var fee = 0.00010000;
          if (gasto > balance) {
            return "No existen fondos suficientes"
          }
          gasto = sb.toSatoshi(gasto);

          let amount = gasto + sb.toSatoshi(fee);
         
          let restante = parseInt(sb.toSatoshi(balance)) - amount;
         
          if (restante < 0) {
            return "No existen fondos suficientes" 
          }
          //se generan los outputs necesarios para los transacciones (enviar billetera de cambio, y pago a otra persona)
          //si existe balance luego del gasto y de fee lo envio a una wallet de cambio
          tx.addOutput(walletpago, gasto);
          if (restante > 0) {
            tx.addOutput(this.generateChangeWallet(), restante);//envio a una addr de cambio addr interna 
          } 
          for (let index = 0; index < this.objKeyPair.length; index++) {//firmar las transacciones con la llave privada

            tx.sign(index, this.objKeyPair[index].pvtKey); 
          }
          console.log(tx.build().toHex());
          resolve(tx.build().toHex()); 
    
      }catch(error){
        reject(error);  
      } 
    });  
  }

  generateChangeWallet() {//generar una wallet de cambio
    return this.getKeyAddr(this.getInternalAddr(0));
  }

  getBalancesAddr(addr){
    let url = 'http://167.99.202.240:3002/api/addr/' + addr + '/utxo';
    return axios.get(url);
  }
 
  sendInApi(hash){
    let url ='http://167.99.202.240:3002/api/tx/send';

    return axios.post(url, { rawtx: hash });
  }
  
  apiPrecios(){
    let url = 'https://min-api.cryptocompare.com/data/price?fsym=ONX&tsyms=USD,VEF'
    return axios.get(url);
  }
}
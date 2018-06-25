import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PinPage page. 
 * 
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pin',
  templateUrl: 'pin.html',
})
export class PinPage {
  pinObj=[];
  next=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.pinObj.slice(0,5);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PinPage');
  }
  addPinNumber(number){
    if (this.pinObj.length <= 5){
        this.pinObj.push(number);
    }
    if (this.pinObj.length === 6){
      this.next = false;
    } 
  }
  removePinNumber(){
    this.pinObj.splice(-1, 1)
    this.next = true;
  }
  removeAllPinNumber(){
    this.pinObj.splice(0);
    this.next = true;
  }
  goToAccount(){
    if(this.pinObj.length < 5){
      
      return false;
    }
    this.storage.set('pin', this.pinObj);
    this.navCtrl.setRoot(HomePage);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the RecivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recive',
  templateUrl: 'recive.html',
})
export class RecivePage {
  init: any;
  addr: any;
  contador = 0;
  balance = 0;
  entrada = false;

  wallet: any;
  amount: 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecivePage');
  }

  

}

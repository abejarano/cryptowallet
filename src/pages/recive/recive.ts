import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recive',
  templateUrl: 'recive.html',
})
export class RecivePage {
  createdCode:any;
  amount=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.createdCode = this.navParams.get('wallet');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecivePage');
  }
  copy(){
    document.getElementById("direccion").textContent;
    document.execCommand("copy");
  }
}

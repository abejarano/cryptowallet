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
    // Crea un campo de texto "oculto"
    var aux = document.createElement("input");

    // Asigna el contenido del elemento especificado al valor del campo
    aux.setAttribute("value", document.getElementById('direccion').innerHTML);

    // Añade el campo a la página
    document.body.appendChild(aux);

    // Selecciona el contenido del campo
    aux.select();

    // Copia el texto seleccionado
    document.execCommand("copy");

    // Elimina el campo de la página
    document.body.removeChild(aux);
  }
}

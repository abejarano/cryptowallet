import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecivePage } from './recive';
import { NgxQRCodeModule } from 'ngx-qrcode3';

@NgModule({
  declarations: [
    RecivePage,
  ], 
  imports: [
    IonicPageModule.forChild(RecivePage),
    NgxQRCodeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecivePageModule {}

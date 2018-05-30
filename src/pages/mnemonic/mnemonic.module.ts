import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MnemonicPage } from './mnemonic';

@NgModule({
  declarations: [
    MnemonicPage,
  ],
  imports: [
    IonicPageModule.forChild(MnemonicPage),
  ],
})
export class MnemonicPageModule {}

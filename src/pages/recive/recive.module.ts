import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecivePage } from './recive';

@NgModule({
  declarations: [
    RecivePage,
  ],
  imports: [
    IonicPageModule.forChild(RecivePage),
  ],
})
export class RecivePageModule {}

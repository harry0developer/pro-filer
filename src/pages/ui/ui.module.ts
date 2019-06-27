import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UiPage } from './ui';

@NgModule({
  declarations: [
    UiPage,
  ],
  imports: [
    IonicPageModule.forChild(UiPage),
  ],
})
export class UiPageModule {}

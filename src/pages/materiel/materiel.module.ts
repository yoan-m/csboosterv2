import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaterielPage } from './materiel';

@NgModule({
  declarations: [
    MaterielPage,
  ],
  imports: [
    IonicPageModule.forChild(MaterielPage),
  ],
})
export class MaterielPageModule {}

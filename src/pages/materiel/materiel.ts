import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CsProvider} from "../../providers/cs/cs";
import {Materiel} from "../../models/user.interface";
import {MaterielProvider} from "../../providers/materiel/materiel";

/**
 * Generated class for the MaterielPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-materiel',
  templateUrl: 'materiel.html',
})
export class MaterielPage {

  public materiels:Materiel[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public csProvider:CsProvider, public materielProvider:MaterielProvider) {
  }

  ionViewDidLoad() {
    this.csProvider.materiels.subscribe(materiels => {
      console.log(materiels);
      this.materiels = materiels;
    });
  }

  public selectMateriel(materiel){
    console.log(materiel);
    this.materielProvider.getMateriel(this.csProvider.csId, materiel.id).subscribe(us => {
        console.log(us);
    });
  }

}

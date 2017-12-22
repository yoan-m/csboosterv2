import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {CsProvider} from "../../providers/cs/cs";
import {Inventaire} from "../../models/user.interface";
import {Observable} from "rxjs";

/**
 * Generated class for the InventairePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-inventaire',
  templateUrl: 'inventaire.html',
})
export class InventairePage {

  public inventaires: Observable<Inventaire[]>;
  constructor(public csProvider:CsProvider, public alertCtrl: AlertController) {
  }
  ionViewDidLoad() {
    this.inventaires = this.csProvider.inventairesCollection.valueChanges();
  }

  public addInventaire(){
    let prompt = this.alertCtrl.create({
      title: 'Inventaire',
      message: "Ajouter un inventaire",
      inputs: [
        {
          name: 'label',
          placeholder: 'Libelle'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            let inventaire = {
              l: data.label,
              id: null
            };
            this.csProvider.addInventaire(inventaire);
          }
        }
      ]
    });
    prompt.present();
  }
  public updateInventaire(inventaire){
    let prompt = this.alertCtrl.create({
      title: 'Inventaire',
      message: "Editer un inventaire",
      inputs: [
        {
          name: 'l',
          placeholder: 'Libelle',
          value: inventaire.l
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            inventaire.l = data.l;
            this.csProvider.updateInventaire(inventaire);
          }
        }
      ]
    });
    prompt.present();
  }
  public deleteInventaire(inventaire){
    this.csProvider.deleteInventaire(inventaire);
  }

}

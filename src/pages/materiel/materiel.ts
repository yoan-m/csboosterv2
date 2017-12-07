import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import {CsProvider} from "../../providers/cs/cs";
import {Materiel} from "../../models/user.interface";
import {Observable} from "rxjs";
import {MaterielProvider} from "../../providers/materiel/materiel";
import {MaterielId} from "../../models/user.interface";


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

  public materiel:Materiel;
  public materiels: Observable<MaterielId[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public csProvider:CsProvider, public materielProvider:MaterielProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    //this.materiels = this.csProvider.materiels;
  }

  public selectMateriel(materiel){
    console.log(materiel);
    const materielObserver = this.materielProvider.getMateriel(this.csProvider.csId, materiel.id).subscribe(us => {
        console.log(us);
      materielObserver.unsubscribe();
      this.materiel = us;
      this.materielProvider.getStorage(this.csProvider.csId, materiel.id).subscribe(st => {
        console.log(st);
      });
    });
  }

  public save(){
    console.log(this.materiel);
    if(this.materiel.id == ''){
      this.materielProvider.addMateriel(this.materiel);
    }else{
      this.materielProvider.updateMateriel(this.materiel);
    }
    this.materiel = null;
  }

  public delete(){
    this.materielProvider.deleteMateriel();
    this.materiel = null;
  }

  public cancel(){
    this.materiel = null;
  }

  public newMateriel(){
    this.materiel = {
      l: '',
      id: null,
      storages: []
    };
  }

  public addStorage(){
      let prompt = this.alertCtrl.create({
        title: 'Emplacement',
        message: "Ajouter un emplacement",
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
              let storage = {
                l: data.label,
                id: null,
                m: this.materiel.id,
                items: []
              };
              this.materielProvider.addStorage(storage);
            }
          }
        ]
      });
      prompt.present();
  }
  public updateStorage(storage){
    let prompt = this.alertCtrl.create({
      title: 'Emplacement',
      message: "Editer un emplacement",
      inputs: [
        {
          name: 'l',
          placeholder: 'Libelle',
          value: storage.l
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
            storage.l = data.l;
            this.materielProvider.updateStorage(storage);
          }
        }
      ]
    });
    prompt.present();
  }
  public updateStorageInventaire(storage){
    let prompt = this.alertCtrl.create({
      title: 'Inventaire',
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
            storage.i = data;
            this.materielProvider.updateStorage(storage);
          }
        }
      ]
    });
    prompt.addInput({
      type: 'radio',
      label: 'Conducteur VSAV',
      value: 'c',
      checked: true
    });
    prompt.addInput({
      type: 'radio',
      label: 'Equipier VSAV',
      value: 'e'
    });
    prompt.present();
  }

  public removeStorage(storage){
    this.materielProvider.removeStorage(storage);
  }

  public addItem(storage: Storage){
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'l',
          placeholder: 'Libelle'
        },{
          name: 'q',
          placeholder: 'Quantite',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            var item = {
              l: data.l,
              q: data.q
            };
            this.materielProvider.addItem(storage, item);
          }
        }
      ]
    });
    prompt.present();
  }
  public updateItem(storage, item){
    let prompt = this.alertCtrl.create({
      title: 'Equipement',
      message: "Editer un équipement",
      inputs: [
        {
          name: 'l',
          placeholder: 'Libelle',
          value: item.l
        },{
          name: 'q',
          value: item.q,
          placeholder: 'Quantite',
          type: 'number'
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
            item.l = data.l;
            item.q = data.q;
            this.materielProvider.updateStorage(storage);
          }
        }
      ]
    });
    prompt.present();
  }
  public removeItem(storage, item){
    this.materielProvider.removeItem(storage, item);
  }

}

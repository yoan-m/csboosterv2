import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
import {CsProvider} from "../../providers/cs/cs";
import * as _ from 'lodash';
import {MaterielProvider} from "../../providers/materiel/materiel";
import {CS} from "../../models/user.interface";
import {Inventaire} from "../../models/user.interface";

@Component({
  selector: 'HomePage',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public csProvider:CsProvider, public materielProvider:MaterielProvider, private auth: AuthProvider, public alertCtrl: AlertController, private _app: App) {

  }
  private cs:Observable<CS>;
  private inventaires: Observable<Inventaire[]>;
  private title: string;
  ionViewDidLoad() {
    /*this.csProvider.getCSDoc().then(c => {
      //this.setTitle(c);
      console.log(c);
    });*/
    //this.inventaires = this.csProvider.csDoc.collection<Inventaire>('inventaires').valueChanges();
    if(this.csProvider.csDoc){
      this.csProvider.csDoc.valueChanges().subscribe(c => {
        this.setTitle(c.nom);
      });
      this.inventaires = this.csProvider.csDoc.collection<Inventaire>('inventaires').valueChanges();
    }
  }
  public inventaire = null;
  public vehicule = null;
  public needToSave = false;
  public addJob(inventaire){
    this.newJob(inventaire);
  }

  public selectInventaire(inventaire){
    this.newJob(inventaire);
    this.setTitle(inventaire.l);
  }

  public selectVehicule(vehicule){
    this.vehicule = vehicule;
    this.setTitle(vehicule.l);
  }

  private newJob(inventaire){
    this.inventaire = {
      i: inventaire.id,
      l:inventaire.l,
      c:false,
      j: []
    };
    var i:Map<string, object>;
    this.csProvider.getInventaire(inventaire.id).valueChanges().subscribe(st => {
      i = new Map<string, object>();
      for(let s of st){
        if(!i[s.m]){
          let m = this.csProvider.materielsData[s.m];
          i[s.m] = {
            l: m.l,
            i: m.id
          };
          i[s.m].s = [];
        }
        i[s.m].s.push(s);
      }
      for (let key in i) {
        let value = i[key];
        // Use `key` and `value`
        value.log = this.materielProvider.getLogInventaire(key, inventaire.id);
        this.inventaire.j.push(value);
      }

    });
  }

  public isVehiculeDone(vehicule){
    return 'done';
  }

  public saveVehicule(){
    for (let key in this.vehicule.s) {
      let storage = this.vehicule.s[key];
      this.materielProvider.updateStorageDoc(storage);
    }
    this.materielProvider.logInventaire(this.vehicule.i, this.inventaire.i);
    this.vehicule = null;
    this.needToSave = false;
  }

  private setTitle(title:string){
    this.title = title;
    this._app.setTitle(this.title);
  }

  public cancelInventaire(){
    if(!this.needToSave){
      this.vehicule = null;
      this.needToSave = false;

      this.setTitle(this.inventaire.l);
    }else{
      let confirm = this.alertCtrl.create({
        title: 'Inventaire en cours',
        message: 'Voulez vous enregistrer les modifications ?',
        buttons: [
          {
            text: 'Non',
            handler: () => {
              this.vehicule = null;
              this.setTitle(this.inventaire.l);
            }
          },
          {
            text: 'Oui',
            handler: () => {
              this.saveVehicule();
            }
          }
        ]
      });
      confirm.present();
    }
  }

  public saveJob(job){
    if(job.id){
      this.csProvider.updateJob(job);
    }else {
      this.csProvider.addJob(job);
    }
  }
  public endJob(job){
    job.c = true;
    this.saveJob(job);
    this.inventaire = null;
  }
  public addItem(i){
    this.needToSave = true;
    if(!i.n){
      i.n = 0;
    }
    i.n++;
  }
  public removeItem(i){
    this.needToSave = true;
    if(!i.n){
      i.n = 0;
    }
    i.n--;
  }
  public setItem(i){
    this.needToSave = true;
    i.n = i.q;
  }
  logout(){
	  this.auth.logoutUser();
  }

}

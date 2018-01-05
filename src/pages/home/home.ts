import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

@Component({
  selector: 'HomePage',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public csProvider:CsProvider, public materielProvider:MaterielProvider, private auth: AuthProvider, public alertCtrl: AlertController) {


  }
  public inventaire = null;
  public vehicule = null;
  public needToSave = false;
  public addJob(inventaire){

    /*const jobObserver = this.csProvider.getLastJob(inventaire.id).subscribe(jobs =>{
      jobObserver.unsubscribe();
      if(jobs.length > 0){
        let confirm = this.alertCtrl.create({
          title: 'Inventaire en cours',
          message: 'Un inventaire est en cours, voulez vous le reprendre ?',
          buttons: [
            {
              text: 'Non',
              handler: () => {
                this.newJob(inventaire);
              }
            },
            {
              text: 'Oui',
              handler: () => {
                this.inventaire = jobs[0];
              }
            }
          ]
        });
        confirm.present();
      }else{
        this.newJob(inventaire);
      }
    });*/
    this.newJob(inventaire);
  }

  public selectInventaire(inventaire){
    this.newJob(inventaire);
  }

  public selectVehicule(vehicule){
    this.vehicule = vehicule;
  }

  private newJob(inventaire){
    this.inventaire = {
      i: inventaire.id,
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
    console.log(vehicule);
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

  public cancelInventaire(){
    if(!this.needToSave){
      this.vehicule = null;
      this.needToSave = false;
    }else{
      let confirm = this.alertCtrl.create({
        title: 'Inventaire en cours',
        message: 'Voulez vous enregistrer les modifications ?',
        buttons: [
          {
            text: 'Non',
            handler: () => {
              this.vehicule = null;
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

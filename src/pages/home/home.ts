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

@Component({
  selector: 'HomePage',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public csProvider:CsProvider, private auth: AuthProvider, public alertCtrl: AlertController) {


  }
  public inventaire = null;
  public addJob(inventaire){

    const jobObserver = this.csProvider.getLastJob(inventaire.id).subscribe(jobs =>{
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
    });
  }

  private newJob(inventaire){
    this.inventaire = {
      i: inventaire.id,
      c:false,
      j: []
    };
    var i:Map<string, object> = new Map<string, object>();
    this.csProvider.getInventaire(inventaire.id).valueChanges().subscribe(st => {
      for(let s of st){
        if(!i[s.m]){
          let m = this.csProvider.materielsData[s.m];
          i[s.m] = {
            l: m.l
          };
          i[s.m].s = [];
        }
        i[s.m].s.push({
          l: s.l,
          items: s.items
        });
      }
      for (let key in i) {
        let value = i[key];
        // Use `key` and `value`
        this.inventaire.j.push(value);
      }

    });
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
    if(!i.n){
      i.n = 0;
    }
    i.n++;
  }
  public removeItem(i){
    if(!i.n){
      i.n = 0;
    }
    i.n--;
  }
  public setItem(i){
    i.n = i.q;
  }
  logout(){
	  this.auth.logoutUser();
  }

}

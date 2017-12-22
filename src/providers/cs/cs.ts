import { Injectable } from '@angular/core';
import {
  AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection
} from "angularfire2/firestore";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

import * as firebase from 'firebase';
import {CS, Materiel, MaterielId, Storage, Inventaire, Job} from "../../models/user.interface";
/*
 Generated class for the CsProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class CsProvider {


  public csDoc: AngularFirestoreDocument<CS>;
  public cs:Observable<CS>;
  public csId:string;

  public materielsCollection: AngularFirestoreCollection<Materiel>;
  public storagesCollection: AngularFirestoreCollection<Storage>;
  public inventairesCollection: AngularFirestoreCollection<Inventaire>;

  public jobsCollection: AngularFirestoreCollection<Job>;

  public materiels: Observable<Materiel[]>;
  public inventaires: Observable<Inventaire[]>;

  public materielsData: {};

  constructor(private afs: AngularFirestore, public toastCtrl: ToastController) {
  }


  getCS(csId: string):Observable<CS> {
    this.csDoc = this.afs.doc<CS>('cs/' + csId);
    this.cs = this.csDoc.valueChanges();
    this.materielsData = {};
    this.materielsCollection = this.csDoc.collection<Materiel>('materiels');
    this.storagesCollection = this.csDoc.collection<Storage>('storages');
    this.inventairesCollection = this.csDoc.collection<Inventaire>('inventaires');
    this.jobsCollection = this.csDoc.collection<Job>('jobs');
    this.materiels = this.materielsCollection.valueChanges();
    this.inventaires = this.inventairesCollection.valueChanges();

    this.materiels.subscribe(mats => {
      console.log(mats);
      for(let mat of mats){
        this.materielsData[mat.id]=mat;
      }
      return mats;
    });
    return this.cs;
  }

  public addInventaire(inventaire: Inventaire){
    const id = this.afs.createId();
    inventaire.id = id;
    this.inventairesCollection.doc(id).set(inventaire);
  }
  public updateInventaire(inventaire){

    this.inventairesCollection.doc(inventaire.id).set(inventaire);
  }
  public deleteInventaire(inventaire: Inventaire){
    this.inventairesCollection.doc(inventaire.id).delete();
  }

  private inventaireCollection: AngularFirestoreCollection<Storage>;
  public getInventaire(inventaireId: string): AngularFirestoreCollection<Storage> {
    this.inventaireCollection = this.csDoc.collection('storages', ref => ref.where('i', '==', inventaireId));
    return this.inventaireCollection;
  }


  public jobCollection: AngularFirestoreCollection<Job>;
  public getLastJob(inventaireId: string): Observable<Job[]> {
    this.jobCollection = this.csDoc.collection('jobs', ref => ref.where('i', '==', inventaireId).where('c', '==', false).limit(1).orderBy('t', 'desc'));
    return this.jobCollection.valueChanges();
  }

  public addJob(job){
    const id = this.afs.createId();
    job.id = id;
    job.t = firebase.firestore.FieldValue.serverTimestamp();
    this.jobsCollection.doc(id).set(job);
    let toast = this.toastCtrl.create({
      message: 'Travail enregistré',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  public updateJob(job){

    this.jobsCollection.doc(job.id).set(job);
    let toast = this.toastCtrl.create({
      message: 'Travail terminé',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}

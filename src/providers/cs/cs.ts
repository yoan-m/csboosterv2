import { Injectable } from '@angular/core';
import {
  AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection
} from "angularfire2/firestore";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
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

  constructor(private afs: AngularFirestore) {
  }


  getCS(csId: string):Observable<CS> {
    this.csDoc = this.afs.doc<CS>('cs/' + csId);
    this.cs = this.csDoc.valueChanges();
    this.materielsCollection = this.csDoc.collection<Materiel>('materiels');
    this.storagesCollection = this.csDoc.collection<Storage>('storages');
    this.inventairesCollection = this.csDoc.collection<Inventaire>('inventaires');
    this.materiels = this.materielsCollection.valueChanges();
    this.inventaires = this.inventairesCollection.valueChanges();
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

}

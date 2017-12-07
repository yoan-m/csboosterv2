import { Injectable } from '@angular/core';
import {AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore} from "angularfire2/firestore";
import {Materiel, Storage, CS} from "../../models/user.interface";
import {Observable} from "rxjs";
import {CsProvider} from "../cs/cs";
import * as _ from 'lodash';
/*
  Generated class for the MaterielProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MaterielProvider {


  private materielsCollection: AngularFirestoreCollection<Materiel>;

  private materielDoc: AngularFirestoreDocument<Materiel>;
  public materiel:Observable<Materiel>;


  private storagesCollection: AngularFirestoreCollection<Storage>;
  public storages: Observable<Storage[]>;

  constructor(private afs: AngularFirestore, private csProvider: CsProvider) {
  }


  getStorage(csId: string,materielId: string):Observable<Storage[]> {
    //this.storagesCollection = this.materielDoc.collection<Storage>('storages');
    this.storagesCollection = this.csProvider.csDoc.collection('storages', ref => ref.where('m', '==', materielId));
    //this.storages = this.materielDoc.collection<Storage>('storages').valueChanges();
    this.storages = this.storagesCollection.valueChanges();
    return this.storages;
  }

  getMateriel(csId: string,materielId: string):Observable<Materiel> {
    this.materielsCollection = this.csProvider.csDoc.collection<Materiel>('materiels');
    this.materielDoc = this.afs.doc<Materiel>('cs/'+csId+'/materiels/'+materielId);
    this.materiel = this.materielDoc.valueChanges();
    return this.materiel;
  }

  updateMateriel(materiel: Materiel) {
    this.materielDoc.update(materiel);
  }

  addMateriel(materiel: Materiel) {
    const id = this.afs.createId();
    materiel.id = id;
    this.csProvider.materielsCollection.doc(id).set(materiel);

  }

  deleteMateriel(){
    this.materielDoc.delete();
  }

  public addStorage(storage: Storage){
    const id = this.afs.createId();
    storage.id = id;
    this.storagesCollection.doc(id).set(storage);
    //this.csProvider.storagesCollection.doc(id).set(storage);
  }
  public updateStorage(storage){

    this.storagesCollection.doc(storage.id).set(storage);
  }
  public removeStorage(storage: Storage){
    this.storagesCollection.doc(storage.id).delete();
  }

  public addItem(s, i){
    s.items.push(i);
    this.storagesCollection.doc(s.id).set(s);
  }
  public updateItem(storage){

    this.storagesCollection.doc(storage.id).set(storage);
  }
  public removeItem(storage, item){
    _.pull(storage.items, item);
    this.storagesCollection.doc(storage.id).set(storage);
  }

}

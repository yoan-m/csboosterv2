import { Injectable } from '@angular/core';
import {AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore} from "angularfire2/firestore";
import {Materiel, Storage, CS} from "../../models/user.interface";
import {Observable} from "rxjs";
import {CsProvider} from "../cs/cs";

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
    this.storagesCollection = this.materielDoc.collection<Storage>('storages');
    this.storages = this.materielDoc.collection<Storage>('storages').valueChanges();
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

  addMateriel(materiel: any) {
    this.csProvider.csDoc.collection<Materiel>('materiels').add(materiel);
  }

  deleteMateriel(){
    this.materielDoc.delete();
  }

}

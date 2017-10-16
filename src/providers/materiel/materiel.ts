import { Injectable } from '@angular/core';
import {AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore} from "angularfire2/firestore";
import {Materiel} from "../../models/user.interface";
import {Observable} from "rxjs";
import {CsProvider} from "../cs/cs";

/*
  Generated class for the MaterielProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MaterielProvider {

  private materielDoc: AngularFirestoreDocument<Materiel>;
  public materiel:Observable<Materiel>;


  private storagesCollection: AngularFirestoreCollection<Storage>;
  public storages: Observable<Storage[]>;

  constructor(private afs: AngularFirestore, private csProvider: CsProvider) {
  }


  getMateriel(csId: string,materielId: string):Observable<Materiel> {
    this.materielDoc = this.afs.doc<Materiel>('cs/'+csId+'/materiels/Kmv8BohctYLrZlTtumi9');
    this.materiel = this.materielDoc.valueChanges();
    return this.materiel;
  }

}

import { Injectable } from '@angular/core';
import {AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs";
import {CS, Materiel} from "../../models/user.interface";
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

  private materielsCollection: AngularFirestoreCollection<Materiel>;
  public materiels: Observable<Materiel[]>;

  constructor(private afs: AngularFirestore) {
  }


  getCS(csId: string):Observable<CS> {
    this.csDoc = this.afs.doc<CS>('cs/' + csId);
    this.cs = this.csDoc.valueChanges();
    this.materielsCollection = this.csDoc.collection<Materiel>('materiels');
    this.materiels = this.materielsCollection.valueChanges();
    return this.cs;
  }

}

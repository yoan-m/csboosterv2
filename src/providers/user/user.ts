import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import {User} from '../../models/user.interface';
import {DocumentSnapshot} from "firebase/firestore";
import {CS} from "../../models/user.interface";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



@Injectable()
export class UserProvider {


  private userDoc: AngularFirestoreDocument<User>;
  user:Observable<User>;
  cs: Promise<DocumentSnapshot>[];

  constructor(private afs: AngularFirestore) {
  }

  getUser(userId: string):Observable<User>{
    this.userDoc = this.afs.doc<User>('user/'+userId);

    this.user = this.userDoc.valueChanges();
    this.user.subscribe(css => {
      console.log(css);
      this.cs = [];
      for (let entry of css.cs) {

        this.cs.push(entry.get());
      }
      Promise.all(this.cs).then(value=> {
        for (let entry of value) {
console.log(entry.data().nom);
        }
      });

      }
    );
    return this.user;
  }
}

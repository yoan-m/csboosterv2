import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import {User} from '../../models/user.interface';
import {DocumentSnapshot} from "firebase/firestore";
import {CS} from "../../models/user.interface";
import * as _ from "lodash";

/*
 Generated class for the UserProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */



@Injectable()
export class UserProvider {


  private userDoc: AngularFirestoreDocument<User>;
  user:Observable<User>;
  cs: Promise<any[]>;
  currentUser: User;

  constructor(private afs: AngularFirestore) {
  }

  getUser(userId: string):Observable<User>{
    this.userDoc = this.afs.doc<User>('user/'+userId);

    this.user = this.userDoc.valueChanges();
    this.user.subscribe(css => {
        this.currentUser = css;
        console.log(css);
        var csPromises = [];
        for (let entry of css.cs) {

          csPromises.push(entry.get());
        }
        this.cs = Promise.all(csPromises).then(value=> {
          this.currentUser.centres = [];

          for (let entry of value) {
            var c = entry.data();
            c.id = entry.id;
            this.currentUser.centres.push(c);
          }
          if(this.currentUser.centres.length == 1){
            this.currentUser.centre = this.currentUser.centres[0];
          }
          return this.currentUser.centres;
        });

      }
    );
    return this.user;
  }
}

import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import {User} from '../../models/user.interface';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



@Injectable()
export class UserProvider {


  private userDoc: AngularFirestoreDocument<User>;
  user:any;

  constructor(private afs: AngularFirestore) {
  }

  getUser(userId: string){
    this.userDoc = this.afs.doc<User>('user/'+userId);
    return  this.userDoc.valueChanges();
  }
}

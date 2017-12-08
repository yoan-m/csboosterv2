import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
import {CsProvider} from "../../providers/cs/cs";

@Component({
  selector: 'HomePage',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public csProvider:CsProvider, private auth: AuthProvider) {


  }

  logout(){
	  this.auth.logoutUser();
  }

}

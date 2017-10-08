import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';


export interface Todo {
  description: string;
  completed: boolean;
}
@Component({
  selector: 'HomePage',
  templateUrl: 'home.html'
})
export class HomePage {

  todoCollectionRef: AngularFirestoreCollection<Todo>;
  todo$: Observable<Todo[]>;
  
  constructor(public navCtrl: NavController, private afs: AngularFirestore, private auth: AuthProvider) {
		this.todoCollectionRef = this.afs.collection<Todo>('cs');
		this.todo$ = this.todoCollectionRef.valueChanges();

  }
  
  logout(){
	this.auth.logoutUser();
  }

}

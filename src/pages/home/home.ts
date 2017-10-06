import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

export interface Todo {
  description: string;
  completed: boolean;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todoCollectionRef: AngularFirestoreCollection<Todo>;
  todo$: Observable<Todo[]>;
  
  constructor(public navCtrl: NavController, private afs: AngularFirestore) {
		this.todoCollectionRef = this.afs.collection<Todo>('cs');
		this.todo$ = this.todoCollectionRef.valueChanges();

  }

}

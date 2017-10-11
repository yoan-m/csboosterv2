
import {DocumentReference} from "firebase/firestore";
import { AngularFirestoreDocument } from 'angularfire2/firestore';
/**
 * Created by murciano on 09/10/2017.
 */
export interface User {
  n: string;
  p: string;
  a: boolean;
  cs:DocumentReference[];
}


export interface CS {
  nom: string;
  sdis:string;
}

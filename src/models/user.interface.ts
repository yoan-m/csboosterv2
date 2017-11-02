import {DocumentReference} from "firebase/firestore";
import { AngularFirestoreDocument } from 'angularfire2/firestore';
/**
 * Created by murciano on 09/10/2017.
 */
export interface User {
  n: string;
  p: string;
  a: boolean;
  centre: CS;
  centres: CS[];
  cs:DocumentReference[];
}


export interface CS {
  nom: string;
  sdis:string;
  id: string;
  materiels:Materiel[];
  inventaires:Inventaire[];
}


export interface Materiel {
  l: string;
  storages: Storage[];
}

export interface MaterielId extends Materiel { id: string; }

export interface Storage {
  l: string;
  id: string;
  items: Item[];
}

export interface Item {
  l: string;
  id: string;
}

export interface Inventaire {
  l: string;
  id: string;
}

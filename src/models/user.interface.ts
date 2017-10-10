
import { Observable } from 'rxjs/Observable';
/**
 * Created by murciano on 09/10/2017.
 */
export interface User {
  n: string;
  p: string;
  a: boolean;
  cs:Observable<CS[]>;
}


export interface CS {
  nom: string;
  sdis:string;
}

import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AngularFireAuth} from 'angularfire2/auth';

import {HomePage} from '../pages/home/home';
import {MaterielPage} from '../pages/materiel/materiel';
import {InventairePage} from '../pages/inventaire/inventaire';
import {GestionPage} from '../pages/gestion/gestion';
import {ProfilPage} from '../pages/profil/profil';
import {UserProvider} from '../providers/user/user';


import {User} from '../models/user.interface';
import {Observable} from "rxjs";
import {CS} from "../models/user.interface";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;


  private item:Observable<User>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              afAuth: AngularFireAuth, public userProvider: UserProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'Profil', component: ProfilPage},
      {title: 'Véhicules', component: MaterielPage},
      {title: 'Gestion', component: GestionPage},
      {title: 'Inventaires', component: InventairePage}
    ];

    const authObserver = afAuth.authState.subscribe(user => {

      if (user) {
        this.item = this.userProvider.getUser(user.uid);
        this.item.subscribe(us => {
            console.log(us);
            this.rootPage = HomePage;
          /*this.userProvider.cs.subscribe(cs => {
              console.log(cs);
            }
          );*/
            authObserver.unsubscribe();
          }
        );

       } else {
       this.rootPage = 'LoginPage';
       authObserver.unsubscribe();
       }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}


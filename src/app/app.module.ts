import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import {MaterielPage} from '../pages/materiel/materiel';
import {InventairePage} from '../pages/inventaire/inventaire';
import {GestionPage} from '../pages/gestion/gestion';
import {ProfilPage} from '../pages/profil/profil';
import { AuthProvider } from '../providers/auth/auth';


// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { CsProvider } from '../providers/cs/cs';
import { SdisProvider } from '../providers/sdis/sdis';
import { MaterielProvider } from '../providers/materiel/materiel';
import { InventaireProvider } from '../providers/inventaire/inventaire';



export const firebaseConfig = {
    apiKey: "AIzaSyA5ouGZK0mMXNCJu2DjIc3-72L-xGqebdk",
    authDomain: "csbooster-dc227.firebaseapp.com",
    databaseURL: "https://csbooster-dc227.firebaseio.com",
    projectId: "csbooster-dc227",
    storageBucket: "csbooster-dc227.appspot.com",
    messagingSenderId: "921974877593"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MaterielPage,
    InventairePage,
    GestionPage,
    ProfilPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MaterielPage,
    InventairePage,
    GestionPage,
    ProfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider,
    CsProvider,
    SdisProvider,
    MaterielProvider,
    InventaireProvider
  ]
})
export class AppModule {}

import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

import {UserProvider} from '../../providers/user/user';
import { EmailValidator } from '../../validators/email';

import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, public authData: AuthProvider,
              public formBuilder: FormBuilder, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController, public userProvider:UserProvider) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then( authData => {

          this.userProvider.getUser(authData.uid).subscribe(us => {
              console.log(us);
              this.userProvider.cs.then(centres => {
                  console.log(centres);
                  if(centres.length == 1){
                    this.navCtrl.setRoot(HomePage);
                  } if(centres.length > 1){
                    this.showCentres(centres);
                  }
                }
              );
            }
          );
        }, error => {
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

  createAccount(){
    this.navCtrl.push('SignupPage');
  }

  showCentres(centres){
    var inputs:Object[] = [];
    for(let centre of centres){
      inputs.push({
        type:'radio',
        label:centre.nom,
        value:centre.id
      })
    }
    let prompt = this.alertCtrl.create({
      title: 'Centres',
      message: 'Sélectionnez votre centre',
      inputs : inputs,
      buttons : [
        {
          text: "Annuler",
          handler: data => {
            console.log("cancel clicked");
          }
        },
        {
          text: "Valider",
          handler: data => {

            this.navCtrl.setRoot(HomePage);
          }
        }]});
    prompt.present();
  }

}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireAuth: AngularFireAuth) { }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.fireAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        })
    })
  }

  googleSignIn() {
    this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  signOut() {
    this.fireAuth.auth.signOut();
  }

  getToken() {
    return this.fireAuth.idToken;
  }
}

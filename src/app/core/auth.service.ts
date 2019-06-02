import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  user$: Observable<User>;
  public userId: string;

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) { 
    this.user$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userId = user.uid
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.fireAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);

    const data = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid
    }
    
    return userRef.set(data, { merge: true})

  }

  async signOut() {
    await this.fireAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}

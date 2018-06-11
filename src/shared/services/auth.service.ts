import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/shared/models/users.model';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  user: User;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private route: ActivatedRoute
  ) {
    this.user$ = afAuth.authState;
  }

  getUser$() {
    return this.user$;
  }

  register(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginWithEmail(email, password) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  saveUserInfoFromForm(uid, name, email, companyId) {
    return this.afs
      .collection('registeredUsers')
      .doc(uid)
      .set({
        companyId: companyId,
        name: name,
        email: email,
        roles: ['USER']
      });
  }

  getRegisteredUsers(uid: string) {
    return this.afs.doc('registeredUsers/' + uid).valueChanges();
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(data => {
        this.afs.firestore.disableNetwork();
        console.log('SIGNOUT');
      })
      .catch(error => {
        console.log('SIGNOUT ERROR', error);
      });
  }
}

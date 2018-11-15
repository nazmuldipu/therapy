import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/users.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login = true;
  errorMessage;

  constructor(private auth: AuthService, private router: Router) {}

  loginClicked() {
    this.login = true;
  }

  registerClicked() {
    this.login = false;
  }

  onRegister(event) {
    // this.showBusy = true;
    this.auth
      .register(event.email, event.password)
      .then(ref => {
        let returnUrl = '/login';
        this.auth
          .saveUserInfoFromForm(
            ref.user.uid,
            event.name,
            event.email,
            event.password
          )
          .then(ref => {
            // this.showBusy = false;
            this.router.navigateByUrl(returnUrl);
            location.reload();
          })
          .catch(error => {
            console.log('USER SAVIG ERROR', error);
            this.errorMessage = error.message;
            // this.showBusy = false;
          });
      })
      .catch(error => {
        console.log('REGISTRATION ERROR', error);
        this.errorMessage = error.message;
        // this.showBusy = false;
      });
  }

  onLogin(event: User) {
    this.auth
      .loginWithEmail(event.email, event.password)
      .then(data => {
        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      })
      .catch(error => {
        console.log('LOGIN ERROR', error);
        this.errorMessage = error.message;
      });
  }
}

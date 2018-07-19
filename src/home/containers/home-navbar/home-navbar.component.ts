import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/shared/models/users.model';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { database } from 'firebase';

@Component({
  selector: 'home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent implements OnInit {
  show = false;
  appUser;
  subscription: Subscription;

  constructor(private auth: AuthService, private router: Router) {}

  async ngOnInit() {
    this.subscription = await this.auth
      .getUser$()
      .pipe(
        map(user => user),
        switchMap(user => {
          if (user !== null && user !== undefined) {
            return this.auth.getRegisteredUsers(user.uid);
          }
          return of(null);
        })
      )
      .subscribe(
        data => {
          console.log('subs');
          if (data) {
            this.appUser = data as User;
            localStorage.setItem('companyId', this.appUser.companyId);
          }
        },
        error => {
          console.log('data loading error');
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.appUser = null;
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  toggleCollapse() {
    this.show = !this.show;
  }
}

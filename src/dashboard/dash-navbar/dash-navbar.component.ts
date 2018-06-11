import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/shared/services/navbar.service';
import { AuthService } from 'src/shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { User } from 'src/shared/models/users.model';
import { createTokenForExternalReference } from '@angular/compiler/src/identifiers';

@Component({
  selector: 'dash-navbar',
  templateUrl: './dash-navbar.component.html',
  styleUrls: ['./dash-navbar.component.scss']
})
export class DashNavbarComponent implements OnInit {
  appUser: User;
  show = false;
  subscription: Subscription;

  constructor(
    private sideNav: NavbarService,
    public auth: AuthService,
    private router: Router
  ) {}

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
      .subscribe(data => {
        if (data) {
          this.appUser = data as User;
          localStorage.setItem('companyId', this.appUser.companyId);
        }
      });
  }

  setSideNav() {
    this.sideNav.setSideNavBarCollapse();
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

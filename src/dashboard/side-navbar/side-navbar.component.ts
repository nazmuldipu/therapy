import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { take } from 'rxjs/internal/operators/take';
import { Subscription } from 'rxjs/internal/Subscription';
import { map, switchMap } from 'rxjs/operators';
import { SideNavbarData } from 'src/shared/json/side-nav-data';
import { User } from 'src/shared/models/users.model';
import { AuthService } from 'src/shared/services/auth.service';
import { NavbarService } from 'src/shared/services/navbar.service';

@Component({
  selector: 'side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {
  // navCollaps: boolean;
  menuList: any;
  selected: any = 'Dashboard';
  navUrl: any;
  roles: string[] = [];

  webTitle: String;
  appUser: User;
  subscription: Subscription;

  constructor(
    private router: Router,
    private sideNav: NavbarService,
    private auth: AuthService
  ) {
    this.menuList = SideNavbarData;
  }
  async ngOnInit() {
    this.getRoles();
  }

  async getRoles() {
    await this.auth
      .getUser$()
      .pipe(
        take(1),
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
          this.roles = data.roles;
          localStorage.setItem('companyId', this.appUser.companyId);
        }
      });
  }

  get navCollaps() {
    return this.sideNav.getSideNavBarCollapse();
  }

  select(smenu) {
    this.selected = smenu;
  }

  isActive(smenu) {
    return this.selected === smenu;
  }

  minimize(smenu) {
    this.selected = smenu == this.selected ? null : smenu;
  }

  navigateTo(url: string) {
    this.sideNav.collapseNavber();
    this.navUrl = url;
    this.router.navigate([url]);
  }

  hasAuthority(authority: string): boolean {
    if (authority == '' || authority == null) return true;
    return this.roles.includes(authority);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

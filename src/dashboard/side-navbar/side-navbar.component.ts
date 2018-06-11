import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { NavbarService } from 'src/shared/services/navbar.service';
import { AuthService } from 'src/shared/services/auth.service';
import { SideNavbarData } from 'src/shared/json/side-nav-data';
import { User } from 'src/shared/models/users.model';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {
  // navCollaps: boolean;
  webTitle: String;
  menuList: any;
  selected: any;
  roles: string[] = [];
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
          this.roles = data.roles;
          localStorage.setItem('companyId', this.appUser.companyId);
        }
      });
  }

  hasAuthority(authority: string): boolean {
    if (authority == '' || authority == null) return true;
    return this.roles.includes(authority);
  }

  get navCollaps() {
    return this.sideNav.getSideNavBarCollapse();
  }

  navbarTrigger() {
    this.sideNav.collapseNavber();
  }

  select(smenu) {
    this.selected = smenu == this.selected ? null : smenu;
  }

  isActive(smenu) {
    return this.selected === smenu;
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}

import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../shared/services/navbar.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private sideNav: NavbarService) {}

  ngOnInit() {}

  get navCollaps() {
    return this.sideNav.getSideNavBarCollapse();
  }

  // <dash-navbar></dash-navbar>
}

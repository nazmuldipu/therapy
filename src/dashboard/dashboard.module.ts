import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { Routes, RouterModule } from '@angular/router';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { DashNavbarComponent } from './dash-navbar/dash-navbar.component';
import { DashboardComponent } from './dashboard.components';
import { SharedModule } from '../shared/shared.module';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: IndexComponent },
      {
        path: 'patients',
        loadChildren: '../patients/patients.module#PatientsModule'
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(ROUTES)],
  declarations: [
    DashboardComponent,
    IndexComponent,
    SideNavbarComponent,
    DashNavbarComponent
  ]
})
export class DashboardModule {}

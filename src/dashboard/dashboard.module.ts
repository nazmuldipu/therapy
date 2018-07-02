import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { Routes, RouterModule } from '@angular/router';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { DashNavbarComponent } from './dash-navbar/dash-navbar.component';
import { DashboardComponent } from './dashboard.components';
import { SharedModule } from '../shared/shared.module';
import { DatabaseMigrationComponent } from './database-migration/database-migration.component';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'migration', component: DatabaseMigrationComponent },
      {
        path: 'patients',
        loadChildren: '../patients/patients.module#PatientsModule'
      },
      {
        path: 'sessions',
        loadChildren: '../sessions/sessions.module#SessionsModule'
      },
      {
        path: 'accounting',
        loadChildren: '../accounting/accounting.module#AccountingModule'
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
    DashNavbarComponent,
    DatabaseMigrationComponent
  ]
})
export class DashboardModule {}

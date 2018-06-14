import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SessionFormComponent } from './components/session-form/session-form.component';
import { NewComponent } from './containers/new/new.component';
import { SessionsComponent } from './containers/sessions/sessions.component';
import { SessionItemComponent } from './components/session-item/session-item.component';
import { ByPatientComponent } from './containers/by-patient/by-patient.component';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: SessionsComponent
  },
  {
    path: 'new',
    component: NewComponent
  },
  {
    path: 'new/:id',
    component: NewComponent
  },
  {
    path: 'by-patient',
    component: ByPatientComponent
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(ROUTES)],
  declarations: [
    SessionsComponent,
    NewComponent,
    SessionFormComponent,
    SessionItemComponent,
    ByPatientComponent
  ]
})
export class SessionsModule {}

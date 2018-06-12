import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './containers/patients/patients.component';
import { NewComponent } from './containers/new/new.component';
import { Routes, RouterModule } from '@angular/router';
import { PatientBasicInfoFormComponent } from './components/patient-basic-info-form/patient-basic-info-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PatientAssesmentFormComponent } from './components/patient-assesment-form/patient-assesment-form.component';
import { PatientTreatmentsFormComponent } from './components/patient-treatments-form/patient-treatments-form.component';
import { PatientFeeFormComponent } from './components/patient-fee-form/patient-fee-form.component';
import { SharedModule } from '../shared/shared.module';
import { PatientItemComponent } from './components/patient-item/patient-item.component';
import { DetailsComponent } from './containers/details/details.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: PatientsComponent
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
    path: 'details/:id',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    PatientsComponent,
    NewComponent,
    PatientBasicInfoFormComponent,
    PatientAssesmentFormComponent,
    PatientTreatmentsFormComponent,
    PatientFeeFormComponent,
    PatientItemComponent,
    DetailsComponent,
    PatientDetailsComponent
  ]
})
export class PatientsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuard } from './services/auth-guard.service';
import { NavbarService } from './services/navbar.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from './services/patient.service';
import { SessionService } from 'src/shared/services/session.service';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { RouterModule } from '@angular/router';
import { PaginateReverseComponent } from './components/paginate-reverse/paginate-reverse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientLedgerService } from './services/patient-ledger.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    NavbarService,
    PatientService,
    SessionService,
    PatientLedgerService
  ],
  declarations: [PatientListComponent, PaginateReverseComponent],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PatientListComponent,
    PaginateReverseComponent,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule
  ]
})
export class SharedModule {}

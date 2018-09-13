import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SessionService } from 'src/shared/services/session.service';

import { PaginateReverseComponent } from './components/paginate-reverse/paginate-reverse.component';
import { PaginateComponent } from './components/paginate/paginate.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { SessionItemComponent } from './components/session-item/session-item.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CashBookService } from './services/cashbook.service';
import { CommonService } from './services/common.service';
import { NavbarService } from './services/navbar.service';
import { PatientLedgerService } from './services/patient-ledger.service';
import { PatientService } from './services/patient.service';
import { ReportService } from './services/report.service';

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
    CommonService,
    NavbarService,
    PatientService,
    SessionService,
    PatientLedgerService,
    CashBookService,
    ReportService
  ],
  declarations: [
    PatientListComponent,
    PaginateReverseComponent,
    PaginateComponent,
    SessionItemComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PatientListComponent,
    SessionItemComponent,
    PaginateComponent,
    PaginateReverseComponent,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule
  ]
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuard } from './services/auth-guard.service';
import { NavbarService } from './services/navbar.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from './services/patient.service';

@NgModule({
  imports: [CommonModule, AngularFireAuthModule, NgbModule.forRoot()],
  providers: [AuthService, AuthGuard, NavbarService, PatientService],
  declarations: [],
  exports: [AngularFireAuthModule, NgbModule.forRoot().ngModule]
})
export class SharedModule {}

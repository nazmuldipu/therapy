import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/shared/services/session.service';
import { Patient } from 'src/shared/models/patient.model';
import { PatientService } from 'src/shared/services/patient.service';
import { PSession } from '../../../shared/models/session.model';

@Component({
  selector: 'app-by-patient',
  templateUrl: './by-patient.component.html',
  styleUrls: ['./by-patient.component.scss']
})
export class ByPatientComponent implements OnInit {
  companyId;
  patients: Patient[];
  firstVisibleDate;
  lastVisibleDate;

  sessions: PSession[];
  limit = 5;

  constructor(
    private sessionService: SessionService,
    private patientService: PatientService
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  ngOnInit() {
    this.onPaginate({
      companyId: this.companyId,
      orderBy: '',
      order: 'desc',
      limit: 5,
      startAfter: new Date()
    });
  }

  // Patient pagination
  async onPaginate({ companyId, orderBy, order, limit, startAfter }: any) {
    await this.patientService
      .getPaginatedStartAfter(companyId, order, limit, startAfter)
      .subscribe(data => {
        this.patients = data;

        this.firstVisibleDate = this.patients[0].updatedAt;
        this.lastVisibleDate = this.patients[
          this.patients.length - 1
        ].updatedAt;
      });
  }

  async onEdit(event) {
    this.sessions = [];
    await this.sessionService.getSessionByPatientId(event).subscribe(data => {
      this.sessions = data;
      console.log(this.sessions);
    });
  }
}

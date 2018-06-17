import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from 'src/shared/services/session.service';
import { Patient } from 'src/shared/models/patient.model';
import { PatientService } from 'src/shared/services/patient.service';
import { PSession } from '../../../shared/models/session.model';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-by-patient',
  templateUrl: './by-patient.component.html',
  styleUrls: ['./by-patient.component.scss']
})
export class ByPatientComponent implements OnInit, OnDestroy {
  companyId;
  patients: Patient[];

  sessions: PSession[];
  limit = 5;

  subscription: Subscription;

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Patient pagination
  async onPaginate({ companyId, orderBy, order, limit, startAfter }: any) {
    this.subscription = await this.patientService
      .getPaginatedStartAfter(companyId, order, limit, startAfter)
      .subscribe(data => {
        if (data.length) {
          this.patients = data;
        }
      });
  }

  async onEdit(event) {
    this.sessions = [];
    await this.sessionService.getSessionByPatientId(event).subscribe(data => {
      this.sessions = data;
    });

    this.onPaginate({
      companyId: this.companyId,
      orderBy: '',
      order: 'desc',
      limit: 5,
      startAfter: new Date()
    });
  }
}

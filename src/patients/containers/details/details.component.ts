import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../shared/services/patient.service';
import { Patient } from '../../../shared/models/patient.model';
import { ActivatedRoute } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { SessionService } from '../../../shared/services/session.service';
import { PSession } from '../../../shared/models/session.model';
import { PatientLedger } from '../../../shared/models/patient-ledger.model';
import { PatientLedgerService } from '../../../shared/services/patient-ledger.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id;
  infoType: number = 0;
  patient: Patient;
  psessions: PSession[];
  pledgers: PatientLedger[];

  constructor(
    private patientService: PatientService,
    private sessionService: SessionService,
    private patientLedgerService: PatientLedgerService,
    private activeRoute: ActivatedRoute
  ) {
    this.id = activeRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    await this.patientService.get(this.id).subscribe(data => {
      this.patient = data as Patient;
    });
  }

  onOperation(event: number) {
    switch (event) {
      case 1:
        this.infoType = event;
        break;

      case 2:
        this.infoType = event;
        this.onSessionPaginate({
          order: 'desc',
          limit: 5,
          startAfter: new Date()
        });
        break;

      case 3:
        this.infoType = event;
        this.onLedgerPaginate({
          order: 'desc',
          limit: 5,
          startAfter: new Date()
        });
        break;
    }
  }

  async onSessionPaginate({ order, limit, startAfter }: any) {
    this.sessionService
      .getSessionByPatientId(this.patient.id, order, limit, startAfter)
      .subscribe(data => {
        if (data.length) {
          this.psessions = data;
        }
      });
  }

  async onLedgerPaginate({ order, limit, startAfter }: any) {
    this.patientLedgerService
      .getPatientLedgerByPatientId(this.patient.id, order, limit, startAfter)
      .subscribe(data => {
        if (data.length) {
          this.pledgers = data;
        }
      });
  }

  onSessionEdit(event) {
    console.log('onSessionEdit :', event);
  }
}

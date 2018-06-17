import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/shared/services/patient.service';
import { SessionService } from 'src/shared/services/session.service';
import { Patient } from 'src/shared/models/patient.model';
import { PSession } from 'src/shared/models/session.model';
import { PatientLedger } from 'src/shared/models/patient-ledger.model';
import { PatientLedgerService } from '../../../shared/services/patient-ledger.service';

@Component({
  selector: 'new-session',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  companyId;
  patient: Patient;
  patients: Patient[];
  patientLastSession: PSession;
  limit = 5;

  constructor(
    private sessionService: SessionService,
    private patientService: PatientService,
    private patientLedgerService: PatientLedgerService
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
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
        if (data.length) {
          this.patients = data;
        }
      });
  }

  clean() {
    this.patient = { basic: {}, assesments: {} } as Patient;
    this.patientLastSession = {} as PSession;
  }

  onEdit(event) {
    // Object.assign(this.patient, this.patients.find(p => p.id == event));
    const pat = this.patients.find(p => p.id == event) as Patient;
    this.patient = { ...pat };

    // Load patient Last session
    this.sessionService.getLastSessionByPatientId(event).subscribe(actions => {
      actions.forEach(action => {
        this.patientLastSession = action as PSession;
      });
    });
  }

  onCreate(psession: PSession) {
    //set and save session
    this.sessionService.create(psession);

    //set and save ledger
    const pledger = this.createPLedgerFromSession(psession) as PatientLedger;
    this.patientLedgerService.create(pledger);

    //set and update patient
    const pat = {
      ...this.patient,
      balance: pledger.balance,
      totalSession: psession.sessionNumber
    } as Patient;
    this.patient = null;
    this.patientService.update(pat.id, pat);
  }

  createPLedgerFromSession(session: PSession): PatientLedger {
    const pledger = {
      patientId: session.patientId,
      date: session.date,
      explanation: session.patientName + ' Session #' + session.sessionNumber,
      debit: session.sessionFee,
      credit: 0,
      balance: +session.sessionFee + +this.patient.balance
    } as PatientLedger;

    return pledger;
  }
}

import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../shared/services/patient.service';
import { Patient } from 'src/shared/models/patient.model';
import { PatientLedgerService } from 'src/shared/services/patient-ledger.service';
import { CashBookService } from 'src/shared/services/cashbook.service';
import { take } from 'rxjs/operators';
import { PatientLedger } from '../../../shared/models/patient-ledger.model';
import { Cashbook } from '../../../shared/models/cashbook.model';
import { Timestamp } from '@firebase/firestore-types';

@Component({
  selector: 'app-collect-fee',
  templateUrl: './collect-fee.component.html',
  styleUrls: ['./collect-fee.component.scss']
})
export class CollectFeeComponent implements OnInit {
  companyId;
  patient: Patient;
  patients: Patient[];
  firstVisibleDate;
  lastVisibleDate;
  lastCashBook: Cashbook;
  lastLedger: PatientLedger;
  limit = 5;

  constructor(
    private patientService: PatientService,
    private patientLedgerService: PatientLedgerService,
    private cashBookServic: CashBookService
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
        this.patients = data;

        this.firstVisibleDate = this.patients[0].updatedAt;
        this.lastVisibleDate = this.patients[
          this.patients.length - 1
        ].updatedAt;
      });
  }

  async onEdit(event) {
    //Load patient
    const pat = this.patients.find(p => p.id == event) as Patient;
    this.patient = { ...pat };

    //get Last Cahsbook entry
    await this.cashBookServic
      .getLastCashBook(this.companyId)
      .pipe(take(1))
      .subscribe(actions => {
        actions.forEach(action => {
          this.lastCashBook = action as Cashbook;
        });
      });

    // Load patient last ledger
    this.patientLedgerService
      .getLastPatientLedgerByPatientId(event)
      .pipe(take(1))
      .subscribe(actions => {
        actions.forEach(action => {
          this.lastLedger = action as PatientLedger;
        });
      });
  }

  async onCreate(event: PatientLedger) {
    this.patient.balance = event.balance;
    const cashbook = this.createCashbookFromPatientLedger(event);

    const lastCashBookSeconds = this.getSecondsFromTimestamp(
      this.lastCashBook.date
    );
    const lastLedgerSeconds = this.getSecondsFromTimestamp(
      this.lastLedger.date
    );

    if (
      this.lastLedger &&
      this.lastCashBook &&
      (lastLedgerSeconds > event.date.getTime() ||
        lastCashBookSeconds > event.date.getTime())
    ) {
      console.log(
        'Date error!! your selected date is earlier than patient last ledger or last cashbook entry'
      );
    } else {
      await this.patientLedgerService.create(event);
      await this.patientService.update(this.patient.id, this.patient);
      await this.cashBookServic.create(cashbook);
      this.patient = null;
    }
  }

  createCashbookFromPatientLedger(pledger: PatientLedger): Cashbook {
    let cashBalance =
      (this.lastCashBook == undefined ? 0 : +this.lastCashBook.balance) +
      +pledger.credit -
      +pledger.debit;
    console.log(this.lastCashBook.balance, pledger.credit, pledger.debit);
    const value = {
      date: pledger.date,
      explanation: pledger.explanation,
      debit: pledger.credit,
      credit: pledger.debit,
      balance: cashBalance
    } as Cashbook;
    return value;
  }

  //convert seconds from timestamp
  getSecondsFromTimestamp(date: Date) {
    const { seconds, nanoseconds }: any = date;
    return seconds;
  }
}

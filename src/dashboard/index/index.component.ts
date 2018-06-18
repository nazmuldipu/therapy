import { Component, OnInit } from '@angular/core';
import { CashBookService } from '../../shared/services/cashbook.service';
import { Cashbook } from 'src/shared/models/cashbook.model';
import { CommonService } from '../../shared/services/common.service';
import { SessionService } from '../../shared/services/session.service';
import { take } from 'rxjs/internal/operators/take';
import { PatientService } from '../../shared/services/patient.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  companyId;
  cash: number = 0;
  currentMonthPatients: number = 0;
  currentMonthSessions: number = 0;

  constructor(
    private patientService: PatientService,
    private sessionService: SessionService,
    private cashbookService: CashBookService,
    private commonService: CommonService
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  ngOnInit() {
    this.getPatientsRepo();
    this.getSessionRepo();
    this.getCasbookRepo();
  }

  async getPatientsRepo() {
    // Get this month new Patients
    await this.patientService
      .getDateBetween(
        this.companyId,
        'createdAt',
        'asc',
        this.commonService.getCurrentMonthFirstDay(),
        this.commonService.getCurrentMonthLastDay()
      )
      .pipe(take(1))
      .subscribe(data => {
        this.currentMonthPatients = data.length;
      });
  }

  async getSessionRepo() {
    // Get this month Sessions
    await this.sessionService
      .getDateBetween(
        this.companyId,
        'createdAt',
        'asc',
        this.commonService.getCurrentMonthFirstDay(),
        this.commonService.getCurrentMonthLastDay()
      )
      .pipe(take(1))
      .subscribe(data => {
        this.currentMonthSessions = data.length;
      });
  }

  async getCasbookRepo() {
    // Get Last Cashbook for current cash balance
    await this.cashbookService
      .getLastCashBook(this.companyId)
      .subscribe(data => {
        data.forEach(cas => {
          this.cash = cas.balance;
        });
      });
  }
}

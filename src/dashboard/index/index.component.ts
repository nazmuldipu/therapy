import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';
import { Cashbook } from 'src/shared/models/cashbook.model';
import { Chart } from 'chart.js';

import { CashReport } from '../../shared/models/cash-report.model';
import { CashBookService } from '../../shared/services/cashbook.service';
import { CommonService } from '../../shared/services/common.service';
import { PatientService } from '../../shared/services/patient.service';
import { SessionService } from '../../shared/services/session.service';
import { parse } from 'querystring';
import { ReportService } from 'src/shared/services/report.service';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { PSession } from 'src/shared/models/session.model';

enum OptType {
  TODAY,
  YESTERDAY,
  THIS_WEEK,
  THIS_MONTH,
  LAST_MONTH
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  companyId;
  cashReport: CashReport;
  cash: number = 0;
  currentMonthPatients: number = 0;
  currentMonthSessions: number = 0;
  recentCashbooks: Cashbook[];
  recentSessions: PSession[];

  salesChartButton = 'Week';
  myChart;

  constructor(
    private patientService: PatientService,
    private sessionService: SessionService,
    private cashbookService: CashBookService,
    private reportService: ReportService,
    private commonService: CommonService
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  ngOnInit() {
    this.getPatientsRepo();
    this.getSessionRepo();
    this.getCasbookRepo();
    this.generateLineChart('Week');
    const value = {
      companyId: this.companyId,
      order: 'desc',
      limit: 8,
      startAfter: new Date()
    };
    this.getLastCashbooks(value);
    this.getLastSessions(value);
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
    this.getCashReport(
      this.commonService.getTodayFirst(),
      this.commonService.getTodayLast(),
      OptType.TODAY
    );
    this.getCashReport(
      this.commonService.getYesterdayFirst(),
      this.commonService.getYesterdayLast(),
      OptType.YESTERDAY
    );
    this.getCashReport(
      this.commonService.getCurrentWeekFirst(),
      this.commonService.getCurrentWeekLast(),
      OptType.THIS_WEEK
    );
    this.getCashReport(
      this.commonService.getCurrentMonthFirstDay(),
      this.commonService.getCurrentMonthLastDay(),
      OptType.THIS_MONTH
    );
    this.getCashReport(
      this.commonService.getLastMonthFirstDay(),
      this.commonService.getLastMonthLastDay(),
      OptType.LAST_MONTH
    );
    // Get Last Cashbook for current cash balance
    await this.cashbookService
      .getLastCashBook(this.companyId)
      .pipe(take(1))
      .subscribe(data => {
        data.forEach(cas => {
          this.cash = cas.balance;
          this.cashReport = { ...this.cashReport, balance: cas.balance };
          // this.cashReport.balance = cas.balance;
        });
      });
  }

  async getCashReport(start: Date, end: Date, opt: OptType) {
    await this.cashbookService
      .getDateBetween(this.companyId, 'createdAt', 'asc', start, end)
      .pipe(take(1))
      .subscribe(data => {
        let debit = 0;
        let credit = 0;
        data.forEach((c: Cashbook) => {
          debit += parseInt(c.debit + '', 10);
          credit += parseInt(c.credit + '', 10);
        });

        switch (opt) {
          case 0:
            this.cashReport = {
              ...this.cashReport,
              todayIncome: debit,
              todayExpense: credit
            };
            break;
          case 1:
            this.cashReport = {
              ...this.cashReport,
              yesterdayIncome: debit,
              yesterdayExpense: credit
            };
            break;
          case 2:
            this.cashReport = {
              ...this.cashReport,
              thisWeekIncome: debit,
              thisWeekExpense: credit
            };
            break;
          case 3:
            this.cashReport = {
              ...this.cashReport,
              thisMonthIncome: debit,
              thisMonthExpense: credit
            };
            break;
          case 4:
            this.cashReport = {
              ...this.cashReport,
              lastMonthIncome: debit,
              lastMonthExpense: credit
            };
            break;
        }
      });
  }

  async generateLineChart(mode: string) {
    this.salesChartButton = mode;
    await this.reportService
      .getWeekCashReport(this.companyId, mode)
      .subscribe(ref => {
        this.configLineChart(ref.days, ref.incomes, ref.expenses);
      });
  }

  configLineChart(labels, data1, data2) {
    let config = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Income',
            backgroundColor: '#4faced',
            borderColor: '#4faced',
            data: data1,
            fill: false
          },
          {
            label: 'Expenses',
            backgroundColor: '#ff6384',
            borderColor: '#ff6384',
            data: data2,
            fill: false
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: 'Chart.js Line Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Days'
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value'
              }
            }
          ]
        }
      }
    };

    this.myChart = new Chart('myChart', config);
  }

  async getLastCashbooks({ companyId, order, limit, startAfter }: any) {
    await this.cashbookService
      .getPaginatedStartAfter(companyId, order, limit, startAfter)
      .subscribe(data => {
        if (data.length) {
          this.recentCashbooks = data;
        }
      });
  }

  async getLastSessions({ companyId, order, limit, startAfter }: any) {
    await this.sessionService
      .getPaginatedStartAfter(companyId, order, limit, startAfter)
      .subscribe(data => {
        if (data.length) {
          this.recentSessions = data;
        }
      });
  }
}

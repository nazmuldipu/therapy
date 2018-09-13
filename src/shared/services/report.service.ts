import { Injectable } from '@angular/core';
import { CashBookService } from 'src/shared/services/cashbook.service';
import { map, take } from 'rxjs/operators';
import { Cashbook } from 'src/shared/models/cashbook.model';
import { CommonService } from './common.service';
import { ReveneuLineChart } from '../models/reports.model';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(
    private cashbookService: CashBookService,
    private CommonService: CommonService
  ) {}

  getWeekCashReport(companyId) {
    // declare variables;
    let incomes = [];
    let expenses = [];
    let reqUrl = [];
    let days = ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];

    // declare and adjust day firt time and day last time
    const dayFirst = new Date();
    dayFirst.setHours(0, 0, 0);
    const dayLast = new Date();
    dayLast.setHours(23, 59, 59);

    // adjust day array last day is today
    for (var i = 0; i < 6 - dayFirst.getDay(); i += 1) {
      days.push(days.shift());
    }
    dayFirst.setDate(dayFirst.getDate() - 6);
    dayLast.setDate(dayLast.getDate() - 6);

    //preparign request for forkjoin
    for (var i = 0; i < 7; i += 1) {
      reqUrl.push(this.getCashReportDateBetween(companyId, dayFirst, dayLast));
      dayFirst.setDate(dayFirst.getDate() + 1);
      dayLast.setDate(dayLast.getDate() + 1);
    }

    return forkJoin<ReveneuLineChart>(reqUrl).pipe(
      map(ref => {
        ref.forEach(rev => {
          incomes.push(rev.income);
          expenses.push(rev.expense);
        });
        return { incomes, expenses, days };
      })
    );
  }
  
  getCashReportDateBetween(companyId, start: Date, end: Date) {
    let income = 0;
    let expense = 0;
    let profit = 0;
    return this.cashbookService
      .getDateBetween(companyId, 'date', 'asc', start, end)
      .pipe(
        take(1),
        map(data => {
          data.forEach((c: Cashbook) => {
            income += parseInt(c.debit + '', 10);
            expense += parseInt(c.credit + '', 10);
          });

          profit = income - expense;
          const value: ReveneuLineChart = {
            day: start,
            income,
            expense,
            profit
          };
          return value;
        })
      );
  }
}

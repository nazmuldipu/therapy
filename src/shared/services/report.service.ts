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

  getWeekCashReport(companyId: string, mode: string) {
    let numberOfDays = 0;
    let incomes = [];
    let expenses = [];
    let reqUrl = [];
    let days = [];

    // declare and adjust day firt time and day last time
    const dayFirst = new Date();
    dayFirst.setHours(0, 0, 0);
    const dayLast = new Date();
    dayLast.setHours(23, 59, 59);

    switch (mode) {
      case 'Week':
        days = ['শুক্র', 'শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি'];
        numberOfDays = 7;
        dayFirst.setDate(dayFirst.getDate() - numberOfDays - 1);
        dayLast.setDate(dayLast.getDate() - numberOfDays - 1);
        // adjust day array last day is today
        for (var i = 0; i < 6 - dayFirst.getDay(); i += 1) {
          days.push(days.shift());
        }
        break;
      case 'Month':
        // days = [1,2,3,4,5,6,7,8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
        var mdays = [];
        var today = new Date();
        var day_length = 1000 * 60 * 60 * 24; //the length of a day in milliseconds
        numberOfDays = 31;
        today.setDate(today.getDate() - numberOfDays);
        for (var i = 0; i < numberOfDays; i++) {
          today.setDate(today.getDate() + 1);
          days.push(today.toLocaleDateString());
          // console.log(today.toLocaleDateString());
        }

        dayFirst.setDate(dayFirst.getDate() - numberOfDays);
        dayLast.setDate(dayLast.getDate() - numberOfDays);
        // console.log(days);
        break;
    }

    //preparign request for forkjoin
    for (var i = 0; i < numberOfDays; i += 1) {
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

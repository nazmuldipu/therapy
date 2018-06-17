import { Component, OnInit } from '@angular/core';
import { Cashbook } from 'src/shared/models/cashbook.model';
import { CashBookService } from 'src/shared/services/cashbook.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  companyId;
  cashbooks: Cashbook[];
  lastCashBook: Cashbook;

  constructor(private cashbookService: CashBookService) {
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    this.onPaginate({
      companyId: this.companyId,
      order: 'desc',
      limit: 5,
      startAfter: new Date()
    });

    //get Last Cahsbook entry
    await this.cashbookService
      .getLastCashBook(this.companyId)
      .subscribe(actions => {
        actions.forEach(action => {
          this.lastCashBook = action;
        });
      });
  }

  async onPaginate({ companyId, order, limit, startAfter }: any) {
    await this.cashbookService
      .getPaginatedStartAfter(companyId, order, limit, startAfter)
      .subscribe(data => {
        if (data.length) {
          this.cashbooks = data;
        }
      });
  }

  async onCreate(event: Cashbook) {
    console.log(event);
    const lastCashBookSeconds = this.getSecondsFromTimestamp(
      this.lastCashBook.date
    );

    if (lastCashBookSeconds > event.date.getTime()) {
      console.log(
        'Date error!! your selected date is earlier than the last cashbook entry'
      );
    } else {
      await this.cashbookService.create(event);
      // this.getLastPage();
      this.onPaginate({
        companyId: this.companyId,
        order: 'desc',
        limit: 5,
        startAfter: new Date()
      });
    }
  }

  //convert seconds from timestamp
  getSecondsFromTimestamp(date: Date) {
    const { seconds, nanoseconds }: any = date;
    return seconds;
  }
}

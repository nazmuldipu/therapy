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
  saving = false;
  showLoading = false;

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

    this.getLastCashbook();
  }

  async getLastCashbook() {
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
    this.showLoading = true;
    await this.cashbookService
      .getPaginatedStartAfter(companyId, order, limit, startAfter)
      .subscribe(data => {
        if (data.length) {
          this.cashbooks = data;
        }
        this.showLoading = false;
      });
  }

  async onCreate(event: Cashbook) {
    this.saving = true;

    const lastCashBookSeconds = this.getSecondsFromTimestamp(
      this.lastCashBook.date
    );

    if (lastCashBookSeconds > event.date.getTime()) {
      console.log(
        'Date error!! your selected date is earlier than the last cashbook entry'
      );
    } else {
      await this.cashbookService.create(event).then(ref => {
        this.saving = false;
      });

      this.ngOnInit();
    }
  }

  //convert seconds from timestamp
  getSecondsFromTimestamp(date: Date) {
    const { seconds, nanoseconds }: any = date;
    return seconds;
  }
}

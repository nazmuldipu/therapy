import { Component, OnInit } from '@angular/core';
import { CashBookService } from 'src/shared/services/cashbook.service';
import { Cashbook } from '../../../shared/models/cashbook.model';

@Component({
  selector: 'app-cashbook',
  templateUrl: './cashbook.component.html',
  styleUrls: ['./cashbook.component.scss']
})
export class CashbookComponent implements OnInit {
  companyId;
  cashbooks: Cashbook[];
  showLoading = false;

  constructor(private cashbookService: CashBookService) {
    this.companyId = localStorage.getItem('companyId');
  }

  ngOnInit() {
    this.onPaginate({
      companyId: this.companyId,
      order: 'desc',
      limit: 5,
      startAfter: new Date()
    });
  }

  async onPaginate({ companyId, order, limit, startAfter }: any) {
    this.showLoading = true;
    // this.cashbooks = [];
    await this.cashbookService
      .getPaginatedStartAfter(companyId, order, limit, startAfter)
      .subscribe(data => {
        if (data.length) {
          this.cashbooks = data;
        }
        this.showLoading = false;
      });
  }

  // async recalculate() {
  //   let b1 = this.cashbooks[0].balance;
  //   let b2 = 0;
  //   for (let i = 1; i < this.cashbooks.length; i++) {
  //     b2 = b1 + this.cashbooks[i].debit - this.cashbooks[i].credit;
  //     const value = { ...this.cashbooks[i], balance: b2 };
  //     await this.cashbookService.update(value.id, value).then(ref => {
  //       console.log('updated');
  //     });
  //     b1 = b2;
  //   }
  // }
}

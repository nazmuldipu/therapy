import { Component, OnInit } from '@angular/core';
import { CashBookService } from '../../shared/services/cashbook.service';
import { Cashbook } from 'src/shared/models/cashbook.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  companyId;
  cash: number = 0;

  constructor(private cashbookService: CashBookService) {
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    await this.cashbookService
      .getLastCashBook(this.companyId)
      .subscribe(data => {
        data.forEach(cas => {
          this.cash = cas.balance;
        });
      });
  }
}

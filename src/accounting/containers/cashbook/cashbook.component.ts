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
    await this.cashbookService
      .getPaginatedStartAfter(companyId, order, limit, startAfter)
      .subscribe(data => {
        if (data.length) {
          this.cashbooks = data;
        }
      });
  }
}

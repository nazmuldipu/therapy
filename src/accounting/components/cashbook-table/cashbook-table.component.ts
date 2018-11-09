import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Cashbook } from 'src/shared/models/cashbook.model';
import { CashBookService } from 'src/shared/services/cashbook.service';

@Component({
  selector: 'cashbook-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cashbook-table.component.html',
  styleUrls: ['./cashbook-table.component.scss']
})
export class CashbookTableComponent {
  @Input()
  cashbooks: Cashbook[];

  @Input()
  showLoading: boolean;

  @Output()
  pagigate = new EventEmitter<any>();

  constructor(private cashbookService: CashBookService) {}

  async recalculate() {
    let b1 = this.cashbooks[0].balance;
    let b2 = 0;
    for (let i = 1; i < this.cashbooks.length; i++) {
      b2 = b1 + this.cashbooks[i].debit - this.cashbooks[i].credit;
      const value = { ...this.cashbooks[i], balance: b2 };
      await this.cashbookService.update(value.id, value).then(ref => {
        console.log('updated');
      });
      b1 = b2;
    }
  }

  onPaginate(event) {
    this.pagigate.emit(event);
  }
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Cashbook } from 'src/shared/models/cashbook.model';

@Component({
  selector: 'cashbook-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cashbook-item.component.html',
  styleUrls: ['./cashbook-item.component.scss']
})
export class CashbookItemComponent {
  @Input('cashbook') cashbook: any;
  constructor() {}
}

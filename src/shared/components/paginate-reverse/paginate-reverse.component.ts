import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'paginate-reverse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './paginate-reverse.component.html',
  styleUrls: ['./paginate-reverse.component.scss']
})
export class PaginateReverseComponent {
  @Input() firstVisibleDate: Date;
  @Input() lastVisibleDate: Date;

  @Output() paginate = new EventEmitter<any>();

  companyId;
  limit = 5;

  constructor() {
    this.companyId = localStorage.getItem('companyId');
  }

  getPaginated(companyId, orderBy, order, limit, startAfter) {
    this.paginate.emit({
      companyId,
      orderBy,
      order,
      limit,
      startAfter
    });
  }

  paginaiton(page: string) {
    switch (page) {
      case 'first':
        this.getPaginated(
          this.companyId,
          'date',
          'desc',
          this.limit,
          new Date()
        );
        break;
      case 'previous':
        this.getPaginated(
          this.companyId,
          'date',
          'asc',
          this.limit,
          this.firstVisibleDate
        );
        break;
      case 'next':
        this.getPaginated(
          this.companyId,
          'date',
          'desc',
          this.limit,
          this.lastVisibleDate
        );
        break;
      case 'last':
        this.getPaginated(this.companyId, 'date', 'asc', this.limit, null);
        break;
      default:
        console.log("I don't know who I am ");
        break;
    }
  }

  changeLimit(value) {
    this.limit = parseInt(value);
    this.paginaiton('first');
  }
}

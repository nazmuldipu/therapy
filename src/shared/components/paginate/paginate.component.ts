import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'paginate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent {
  @Input('firstVisibleDate')
  firstVisibleDate: any;
  @Input('lastVisibleDate')
  lastVisibleDate: any;

  @Output()
  paginate = new EventEmitter<any>();

  companyId;
  limit;

  constructor() {
    this.companyId = localStorage.getItem('companyId');
    this.limit = 5;
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
        this.getPaginated(this.companyId, 'date', 'asc', this.limit, null);
        break;
      case 'previous':
        this.getPaginated(
          this.companyId,
          'date',
          'desc',
          this.limit,
          this.firstVisibleDate
        );
        break;
      case 'next':
        this.getPaginated(
          this.companyId,
          'date',
          'asc',
          this.limit,
          this.lastVisibleDate
        );
        break;
      case 'last':
        this.getPaginated(
          this.companyId,
          'date',
          'desc',
          this.limit,
          new Date()
        );
        break;
      default:
        console.log("I don't know who I am ");
        break;
    }
  }

  changeLimit(value) {
    this.limit = parseInt(value);
    this.paginaiton('last');
  }
}

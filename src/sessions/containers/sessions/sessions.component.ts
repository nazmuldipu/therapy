import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/shared/services/session.service';
import { PSession } from '../../../shared/models/session.model';

@Component({
  selector: 'sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  companyId;
  psessions: PSession[];

  constructor(private sessionService: SessionService) {
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
    await this.sessionService
      .getPaginatedStartAfter(companyId, order, limit, startAfter)
      .subscribe(data => {
        if (data.length) {
          this.psessions = data;
        }
      });
  }
  onEdit(id: string) {
    console.log(id);
  }
}

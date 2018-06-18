import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PSession } from 'src/shared/models/session.model';

@Component({
  selector: 'patient-sessions',
  templateUrl: './patient-sessions.component.html',
  styleUrls: ['./patient-sessions.component.scss']
})
export class PatientSessionsComponent {
  @Input() psessions: PSession[];

  @Output() paginate = new EventEmitter<any>();

  onPaginate(event) {
    this.paginate.emit(event);
  }
}

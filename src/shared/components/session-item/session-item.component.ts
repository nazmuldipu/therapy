import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PSession } from 'src/shared/models/session.model';

@Component({
  selector: 'session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.scss']
})
export class SessionItemComponent {
  @Input() psession;

  @Output() edit = new EventEmitter<string>();

  editSession(id: string) {
    this.edit.emit(id);
  }
}

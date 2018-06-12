import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { Patient } from '../../../shared/models/patient.model';

@Component({
  selector: 'patient-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './patient-item.component.html',
  styleUrls: ['./patient-item.component.scss']
})
export class PatientItemComponent {
  @Input() patient: Patient;

  @Output() details = new EventEmitter<string>();

  constructor() {}

  onDetails(id) {
    this.details.emit(id);
  }
}

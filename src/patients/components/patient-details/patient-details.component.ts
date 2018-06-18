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
  selector: 'patient-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent {
  @Input() patient: Patient;

  @Output() operation= new EventEmitter<number>();

  constructor() {}

  onButton(event:number) {
    this.operation.emit(event);
  }
}

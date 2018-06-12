import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
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

  constructor() {}
}

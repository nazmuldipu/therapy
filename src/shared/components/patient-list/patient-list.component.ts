import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Patient } from 'src/shared/models/patient.model';

@Component({
  selector: 'patient-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent {
  @Input() patient: Patient;

  @Output() edit = new EventEmitter<string>();
  @Output() paginate = new EventEmitter<any>();

  editPatient(id: string) {
    this.edit.emit(id);
  }

  onPaginate(event: any) {
    this.paginate.emit(event);
  }
}

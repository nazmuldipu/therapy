import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { PatientLedger } from 'src/shared/models/patient-ledger.model';

@Component({
  selector: 'patient-ledgers',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './patient-ledgers.component.html',
  styleUrls: ['./patient-ledgers.component.scss']
})
export class PatientLedgersComponent {
  @Input() pledgers: PatientLedger[];

  @Output() paginate = new EventEmitter<any>();

  onPaginate(event) {
    this.paginate.emit(event);
  }
}

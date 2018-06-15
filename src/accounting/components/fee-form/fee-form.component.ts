import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Patient } from 'src/shared/models/patient.model';
import { PatientLedger } from 'src/shared/models/patient-ledger.model';

@Component({
  selector: 'fee-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.scss']
})
export class FeeFormComponent implements OnChanges {
  @Input() patient: Patient;

  @Output() create = new EventEmitter<PatientLedger>();

  form = this.fb.group({
    date: ['', Validators.required],
    patientId: ['', Validators.required],
    explanation: ['', Validators.required],
    debit: ['', Validators.required],
    credit: ['', Validators.required],
    balance: ''
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    if (this.patient && this.patient.basic.name) {
      const { seconds, nanoseconds }: any = this.patient.updatedAt;
      const value = {
        date: new Date(seconds * 1000).toISOString().substring(0, 10),
        patientId: this.patient.id,
        explanation: this.patient.basic.name + ' Session fee',
        debit: 0,
        credit: this.patient.balance
      };
      this.form.patchValue(value);
    }
  }

  save() {
    if (this.form.valid) {
      //modify and update date value
      let dumy = new Date(this.form.controls.date.value);
      const date = new Date();
      date.setFullYear(dumy.getFullYear());
      date.setMonth(dumy.getMonth());
      date.setDate(dumy.getDate());

      const balance: number =
        this.patient.balance - +this.form.controls.credit.value;
      this.form.patchValue({ date: date, balance: balance });
      this.create.emit(this.form.value);
      this.form.reset();
    }
  }
}

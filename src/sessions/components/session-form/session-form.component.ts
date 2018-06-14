import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Patient } from 'src/shared/models/patient.model';
import { PSession } from 'src/shared/models/session.model';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.scss']
})
export class SessionFormComponent implements OnChanges {
  @Input() patient: Patient;
  @Input() lastSession: PSession;
  @Output() create = new EventEmitter<PSession>();

  form = this.fb.group({
    date: [new Date().toISOString().substring(0, 10), Validators.required],
    patientId: ['', Validators.required],
    patientName: ['', Validators.required],
    chiefComplain: ['', Validators.required],
    treatments: ['', Validators.required],
    sessionFee: ['', Validators.required],
    sessionNumber: ['', Validators.required],
    comments: ''
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    if (this.lastSession) {
      const { seconds, nanoseconds }: any = this.lastSession.date;
      const value = {
        date: new Date((seconds + 86400) * 1000).toISOString().substring(0, 10),
        treatments: this.lastSession.treatments,
        sessionFee: this.lastSession.sessionFee,
        sessionNumber: this.lastSession.sessionNumber + 1
      };
      this.form.patchValue(value);
    }
    if (this.patient) {
      const value = {
        patientId: this.patient.id,
        chiefComplain: this.patient.assesments.chiefComplain,
        patientName: this.patient.basic.name
      };
      this.form.patchValue(value);
    }
  }

  saveSession() {
    //modify and update date value
    let dumy = new Date(this.form.controls.date.value);
    const date = new Date();
    date.setFullYear(dumy.getFullYear());
    date.setMonth(dumy.getMonth());
    date.setDate(dumy.getDate());
    const { seconds, nanoseconds }: any = this.lastSession.date;
    const newSeconds = Math.round(date.getTime() / 1000);

    if (newSeconds > seconds) {
      this.form.patchValue({ date: date });
      this.create.emit(this.form.value);
      this.form.reset();
      const value = { date: new Date().toISOString().substring(0, 10) };
      this.form.patchValue(value);
    }
  }
}

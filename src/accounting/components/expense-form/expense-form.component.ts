import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Cashbook } from 'src/shared/models/cashbook.model';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'expense-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent {
  @Input() lastCashBook: Cashbook;

  @Output() create = new EventEmitter<Cashbook>();

  form = this.fb.group({
    date: [new Date().toISOString().substring(0, 10), Validators.required],
    explanation: ['', Validators.required],
    debit: [0, Validators.required],
    credit: [0, Validators.required],
    balance: [0, Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  save() {
    if (this.form.valid) {
      //modify and update date value
      let dumy = new Date(this.form.controls.date.value);
      const date = new Date();
      date.setFullYear(dumy.getFullYear());
      date.setMonth(dumy.getMonth());
      date.setDate(dumy.getDate());

      const balance: number =
        this.lastCashBook.balance +
        this.form.controls.debit.value -
        this.form.controls.credit.value;

      this.form.patchValue({ date: date, balance: balance });
      this.create.emit(this.form.value);

      this.form.reset();
      const value = { date: new Date().toISOString().substring(0, 10) };
      this.form.patchValue(value);
    }
  }
}

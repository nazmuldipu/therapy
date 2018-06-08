import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/shared/models/users.model';

@Component({
  selector: 'register-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  @Output() register = new EventEmitter<User>();

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  constructor(private fb: FormBuilder) {}

  send() {
    if (this.form.valid) {
      this.register.emit(this.form.value);
    }
  }
}

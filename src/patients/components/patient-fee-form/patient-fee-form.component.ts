import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'patient-fee-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './patient-fee-form.component.html',
  styleUrls: ['./patient-fee-form.component.scss']
})
export class PatientFeeFormComponent {
  @Input() parent: FormGroup;

  @Output() next = new EventEmitter<number>();

  required(name: string) {
    return (
      this.parent.get(`fees.${name}`).hasError('required') &&
      this.parent.get(`fees.${name}`).touched
    );
  }

  onNext() {
    this.next.emit(5);
  }

  onBack() {
    this.next.emit(3);
  }

  onCancel() {
    this.next.emit(0);
  }
}

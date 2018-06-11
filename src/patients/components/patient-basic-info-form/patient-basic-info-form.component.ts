import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'patient-basic-info-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './patient-basic-info-form.component.html',
  styleUrls: ['./patient-basic-info-form.component.scss']
})
export class PatientBasicInfoFormComponent {
  @Input() parent: FormGroup;

  @Output() next = new EventEmitter<number>();

  required(name: string) {
    return (
      this.parent.get(`basic.${name}`).hasError('required') &&
      this.parent.get(`basic.${name}`).touched
    );
  }

  onNext() {
    this.next.emit(2);
  }

  onCancel() {
    this.next.emit(0);
  }
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'patient-treatments-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './patient-treatments-form.component.html',
  styleUrls: ['./patient-treatments-form.component.scss']
})
export class PatientTreatmentsFormComponent {
  @Input() parent: FormGroup;

  @Output() next = new EventEmitter<number>();

  constructor(private fb: FormBuilder) {}

  onNext() {
    this.next.emit(4);
  }

  onBack() {
    this.next.emit(2);
  }

  onCancel() {
    this.next.emit(0);
  }

  get treatments(): FormArray {
    return this.parent.get('cures').get('treatments') as FormArray;
  }

  get advices(): FormArray {
    return this.parent.get('cures').get('advices') as FormArray;
  }

  get requiredTests(): FormArray {
    return this.parent.get('cures').get('requiredTests') as FormArray;
  }

  get medications(): FormArray {
    return this.parent.get('cures').get('medications') as FormArray;
  }

  addTreatments() {
    let control = this.parent.get('cures').get('treatments') as FormArray;
    control.push(new FormControl(''));

    // this.parent.treatments.treatments.push(new FormControl(''));
  }

  addAdvices() {
    let control = this.parent.get('cures').get('advices') as FormArray;
    control.push(new FormControl(''));
    // this.advices.push(new FormControl(''));
  }

  addRequiredTests() {
    let control = this.parent.get('cures').get('requiredTests') as FormArray;
    control.push(new FormControl(''));
    // this.requiredTests.push(new FormControl(''));
  }

  addMedications() {
    let control = this.parent.get('cures').get('medications') as FormArray;
    control.push(new FormControl(''));
    // this.medications.push(new FormControl());
  }
}

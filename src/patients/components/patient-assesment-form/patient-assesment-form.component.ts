import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'patient-assesment-form',
  templateUrl: './patient-assesment-form.component.html',
  styleUrls: ['./patient-assesment-form.component.scss']
})
export class PatientAssesmentFormComponent {
  @Input() parent: FormGroup;

  @Output() next = new EventEmitter<number>();

  required(name: string) {
    return (
      this.parent.get(`assesments.${name}`).hasError('required') &&
      this.parent.get(`assesments.${name}`).touched
    );
  }

  onNext() {
    this.next.emit(3);
  }

  onBack() {
    this.next.emit(1);
  }

  onCancel() {
    this.next.emit(0);
  }
}

import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../shared/services/patient.service';
import { Patient } from '../../../shared/models/patient.model';
import { ActivatedRoute } from '@angular/router';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id;
  patient: Patient;

  constructor(
    private patientService: PatientService,
    private activeRoute: ActivatedRoute
  ) {
    this.id = activeRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    await this.patientService.get(this.id).subscribe(data => {
      this.patient = data as Patient;
    });
  }
}

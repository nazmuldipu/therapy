import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../shared/services/patient.service';
import { Subscription } from 'rxjs';
import { Patient } from '../../../shared/models/patient.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  companyId;
  patients: Patient[];
  subscription: Subscription;

  constructor(private patientService: PatientService, private router: Router) {
    this.companyId = localStorage.getItem('companyId');
  }

  ngOnInit() {
    this.onPaginate({
      companyId: this.companyId,
      orderBy: 'date',
      order: 'desc',
      limit: 9,
      startAfter: new Date()
    });
  }

  async onPaginate({ companyId, orderBy, order, limit, startAfter }: any) {
    this.subscription = await this.patientService
      .getPaginatedStartAfter(companyId, orderBy, order, limit, startAfter)
      .subscribe(data => {
        this.patients = data;
      });
  }

  onDetails(event: string) {
    this.router.navigate(['/dashboard/patients/details', event]);
  }
}

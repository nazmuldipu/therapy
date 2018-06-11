import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class PatientService {
  serviceUrl = 'patients';
  companyId;

  constructor(private afs: AngularFirestore) {
    this.companyId = localStorage.getItem('companyId');
  }

  create(patient: Patient) {
    const value = {
      ...patient,
      createdDate: new Date(),
      companyId: this.companyId
    };
    console.log(value);
    return this.afs.collection(this.serviceUrl).add({
      ...value
    });
  }
}

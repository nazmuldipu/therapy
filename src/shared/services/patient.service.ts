import { Injectable } from '@angular/core';
import { OrderByDirection } from '@firebase/firestore-types';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';

import { Patient } from '../models/patient.model';

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
      createdAt: new Date(),
      updatedAt: new Date(),
      companyId: this.companyId
    };

    return this.afs.collection(this.serviceUrl).add({
      ...value
    });
  }

  getAll(companyId) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref.where('companyId', '==', companyId).orderBy('date')
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Patient;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(pid: string) {
    return this.afs
      .doc(this.serviceUrl + '/' + pid)
      .valueChanges()
      .pipe(
        take(1),
        map(ref => {
          const value = { ...ref, id: pid } as Patient;
          return value;
        })
      );
  }

  getPaginatedStartAfter(
    companyId,
    order: OrderByDirection = 'asc',
    limit,
    startAfter
  ) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref
          .where('companyId', '==', companyId)
          .orderBy('updatedAt', order)
          .limit(limit)
          .startAfter(startAfter)
      )
      .snapshotChanges()
      .pipe(
        // take(1),
        map(actions => {
          if (order === 'asc') {
            actions.reverse();
          }
          return actions.map(a => {
            const data = a.payload.doc.data() as Patient;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  update(pid, patient: Patient) {
    delete patient['id'];
    return this.afs.doc(this.serviceUrl + '/' + pid).update({
      ...patient,
      updatedAt: new Date()
    });
  }

  delete(pid) {
    return this.afs.doc(this.serviceUrl + '/' + pid).delete();
  }
}

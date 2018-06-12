import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, tap, take } from 'rxjs/operators';
import { OrderByDirection } from '@firebase/firestore-types';
import { of } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

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
      updateDate: new Date(),
      companyId: this.companyId
    };
    console.log(value);
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
    if (!pid) return of({});
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
    orderBy,
    order: OrderByDirection = 'asc',
    limit,
    startAfter
  ) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref
          .where('companyId', '==', companyId)
          .orderBy(orderBy, order)
          .orderBy('createdDate', order)
          .limit(limit)
          .startAfter(startAfter)
      )
      .snapshotChanges()
      .pipe(
        map(actions => {
          if (order === 'desc') {
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
      updateDate: new Date()
    });
  }

  delete(pid) {
    return this.afs.doc(this.serviceUrl + '/' + pid).delete();
  }
}

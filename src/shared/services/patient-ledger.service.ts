import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { OrderByDirection } from '@firebase/firestore-types';
import { PatientLedger } from 'src/shared/models/patient-ledger.model';
import { map, tap, take } from 'rxjs/operators';

@Injectable()
export class PatientLedgerService {
  companyId;
  serviceUrl = 'patientLedger';

  constructor(private afs: AngularFirestore) {
    this.companyId = localStorage.getItem('companyId');
  }

  create(pLedger: PatientLedger) {
    const value = {
      ...pLedger,
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
        ref.where('companyId', '==', companyId).orderBy('updatedAt')
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as PatientLedger;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(plid) {
    return this.afs
      .doc(this.serviceUrl + '/' + plid)
      .valueChanges()
      .pipe(
        take(1),
        map(ref => {
          const value = { ...ref, id: plid } as PatientLedger;
          return value;
        })
      );
  }

  getPatientLedgerByPatientId(patientId) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref.where('patientId', '==', patientId).orderBy('date')
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as PatientLedger;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getLastPatientLedgerByPatientId(patientId) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref
          .where('patientId', '==', patientId)
          .orderBy('date', 'desc')
          .orderBy('createdAt', 'desc')
          .limit(1)
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as PatientLedger;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
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
          .orderBy('createdAt', order)
          .limit(limit)
          .startAfter(startAfter)
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as PatientLedger;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getPaginatedPatientLedgerStartAfter(
    patientId,
    order: OrderByDirection = 'asc',
    limit,
    startAfter
  ) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref
          .where('patientId', '==', patientId)
          .orderBy('updatedAt', order)
          .limit(limit)
          .startAfter(startAfter)
      )
      .snapshotChanges();
  }

  update(plid, pLedger: PatientLedger) {
    delete pLedger['id'];
    return this.afs.doc(this.serviceUrl + '/' + plid).update({
      ...pLedger,
      updatedAt: new Date()
    });
  }

  delete(plid) {
    return this.afs.doc(this.serviceUrl + '/' + plid).delete();
  }
}

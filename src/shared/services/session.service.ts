import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { PSession } from '../models/session.model';
import { map, tap, take } from 'rxjs/operators';
import { OrderByDirection } from '@firebase/firestore-types';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  companyId;
  serviceUrl = 'sessions';

  constructor(private afs: AngularFirestore) {
    this.companyId = localStorage.getItem('companyId');
  }

  create(session: PSession) {
    const value = {
      ...session,
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
        take(1),
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as PSession;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(sid: string) {
    return this.afs
      .doc(this.serviceUrl + '/' + sid)
      .valueChanges()
      .pipe(
        take(1),
        map(ref => {
          const value = { ...ref, id: sid } as PSession;
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
    console.log(companyId, order, limit, startAfter);
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
        // take(1),
        map(actions => {
          if (order === 'asc') {
            actions.reverse();
          }
          console.log(actions);
          return actions.map(a => {
            const data = a.payload.doc.data() as PSession;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getSessionByPatientId(
    patientId,
    order: OrderByDirection = 'asc',
    limit,
    startAfter
  ) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref
          .where('patientId', '==', patientId)
          .orderBy('createdAt', order)
          .limit(limit)
          .startAfter(startAfter)
      )
      .snapshotChanges()
      .pipe(
        take(2),
        map(actions => {
          if (order === 'asc') {
            actions.reverse();
          }
          return actions.map(a => {
            const data = a.payload.doc.data() as PSession;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getDateBetween(
    companyId,
    orderBy,
    order: OrderByDirection = 'asc',
    startAt,
    endAt
  ) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref
          .where('companyId', '==', companyId)
          .orderBy(orderBy, order)
          .startAt(startAt)
          .endAt(endAt)
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as PSession;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getLastSessionByPatientId(patientId) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref
          .where('patientId', '==', patientId)
          .orderBy('createdAt', 'desc')
          .limit(1)
      )
      .snapshotChanges()
      .pipe(
        take(1),
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as PSession;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  update(sid, session: PSession) {
    delete session['id'];
    return this.afs.doc(this.serviceUrl + '/' + sid).update({
      ...session,
      updatedAt: new Date()
    });
  }

  delete(sid) {
    return this.afs.doc(this.serviceUrl + '/' + sid).delete();
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { OrderByDirection } from '@firebase/firestore-types';
import { Cashbook } from '../models/cashbook.model';
import { map, tap, take } from 'rxjs/operators';

@Injectable()
export class CashBookService {
  companyId;
  serviceUrl = 'cash-book';

  constructor(private afs: AngularFirestore) {
    this.companyId = localStorage.getItem('companyId');
  }

  create(cashBook: Cashbook) {
    const value = {
      ...cashBook,
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
            const data = a.payload.doc.data() as Cashbook;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(cashBookId) {
    return this.afs
      .doc(this.serviceUrl + '/' + cashBookId)
      .valueChanges()
      .pipe(
        take(1),
        map(ref => {
          const value = { ...ref, id: cashBookId } as Cashbook;
          return value;
        })
      );
  }

  getLastCashBook(companyId) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref
          .where('companyId', '==', companyId)
          .orderBy('createdAt', 'desc')
          .limit(1)
      )
      .snapshotChanges()
      .pipe(
        take(1),
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Cashbook;
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
        take(2),
        map(actions => {
          if (order === 'desc') {
            actions.reverse();
          }
          return actions.map(a => {
            const data = a.payload.doc.data() as Cashbook;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getCashbookForDateBetween(
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
            const data = a.payload.doc.data() as Cashbook;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  update(cashBookId, cashBook: Cashbook) {
    delete cashBook['id'];
    return this.afs.doc(this.serviceUrl + '/' + cashBookId).update({
      ...cashBook,
      updatedAt: new Date()
    });
  }

  delete(cashBookId) {
    return this.afs.doc(this.serviceUrl + '/' + cashBookId).delete();
  }
}

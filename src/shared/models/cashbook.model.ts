import { Timestamp } from '@firebase/firestore-types';

export interface Cashbook {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  companyId: string;
  date: Date;
  explanation: string;
  ref: number;
  debit: number;
  credit: number;
  balance: number;
}

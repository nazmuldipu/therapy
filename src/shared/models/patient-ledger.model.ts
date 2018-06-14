import { Patient } from './patient.model';
import { Timestamp } from '@firebase/firestore-types';

export interface PatientLedger {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  companyId: string;
  patientId: string;
  date: Date;
  explanation: string;
  ref: number;
  debit: number;
  credit: number;
  balance: number;
  paid: boolean;
}

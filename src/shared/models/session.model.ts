import { Timestamp } from '@firebase/firestore-types';

export interface PSession {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  companyId: string;
  date: Date;
  patientId: string;
  patientName: string;
  chiefComplain: string;
  sessionNumber: number;
  treatments: string;
  comments: string;
  sessionFee: number;
}

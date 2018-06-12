export interface Patient {
  id: string;
  createdDate: Date;
  updateDate: Date;
  date: Date;
  totalSession: number;
  companyId: string;
  basic: BasicInfo;
  assesments: Assesments;
  cures: Cures;
  fees: Fees;
  balance: number;
  due: number;
}

interface BasicInfo {
  name: string;
  age: string;
  date: Date;
  phone: string;
  gender: string;
}

interface Assesments {
  chiefComplain: string;
  pastHistory: string;
  pastMedicalHistory: string;
  onExaminaton: string;
  soiling: boolean;
  redness: boolean;
  tender: boolean;
  movement: string;
  rom: string;
}

interface Cures {
  treatments: string[];
  advices: string[];
  medications: string[];
  requiredTests: string[];
}

interface Fees {
  prescribeFee: number;
  sessionFee: number;
}

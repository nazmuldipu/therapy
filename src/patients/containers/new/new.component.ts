import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Patient } from '../../../shared/models/patient.model';
import { PatientService } from '../../../shared/services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/shared/services/session.service';
import { PSession } from '../../../shared/models/session.model';
import { PatientLedgerService } from 'src/shared/services/patient-ledger.service';
import { PatientLedger } from '../../../shared/models/patient-ledger.model';

@Component({
  selector: 'new-patient',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  id;
  exists = false;
  patient: Patient;
  currentForm = 1;
  currentTitle = 'সাধারণ তথ্য';

  form = this.fb.group({
    basic: this.fb.group({
      date: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required]
    }),
    assesments: this.fb.group({
      chiefComplain: ['', Validators.required],
      pastHistory: '',
      pastMedicalHistory: '',
      onExaminaton: '',
      tender: false,
      soiling: false,
      redness: false
    }),
    cures: this.fb.group({
      treatments: this.fb.array(['']),
      advices: this.fb.array(['']),
      medications: this.fb.array(['']),
      requiredTests: this.fb.array([''])
    }),
    fees: this.fb.group({
      prescribeFee: ['500', Validators.required],
      sessionFee: ['300', Validators.required]
    })
  });

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private sessionService: SessionService,
    private patientLedgerService: PatientLedgerService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.id = activeRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    if (this.id) {
      await this.patientService.get(this.id).subscribe(data => {
        this.patient = data as Patient;
        this.form.patchValue(data);
        this.exists = true;
      });
    }
  }

  onNext(event) {
    switch (event) {
      case 0:
        if (confirm('আনপনি কি নিশ্চিত যে আপনি ফেরত যেতে চান ? ')) {
          this.router.navigate(['/dashboard/patients']);
        }
        break;

      case 1:
        this.currentForm = 1;
        this.currentTitle = 'সাধারণ তথ্য';
        break;

      case 2:
        this.currentForm = 2;
        this.currentTitle = 'মূল্যায়ন';
        break;

      case 3:
        this.currentForm = 3;
        this.currentTitle = 'চিকিৎসা';
        break;

      case 4:
        this.currentForm = 4;
        this.currentTitle = 'ফি';
        break;

      case 5:
        const patient = this.cleanObject(this.form.value) as Patient;
        patient.basic = this.cleanObject(patient.basic);
        patient.assesments = this.cleanObject(patient.assesments);
        patient.cures = this.cleanObject(patient.cures);
        if (!this.exists) {
          patient.date = this.updateDateObject(patient.basic.date);
          patient.balance = patient.fees.prescribeFee;
          patient.totalSession = 1;

          this.patientService.create(patient).then(ref => {
            patient.id = ref.id;
            this.form.reset();
            this.currentForm = 1;
            this.currentTitle = 'সাধারণ তথ্য';
            this.createSession(patient);
            this.createLedter(patient);
          });
        } else {
          const value = { ...this.patient, ...patient };
          this.patientService.update(this.id, value).then(ref => {
            this.form.reset();
            this.currentForm = 1;
            this.currentTitle = 'সাধারণ তথ্য';
          });
        }
        break;
    }
  }

  async createSession(patient: Patient) {
    let treatments = '';
    if (patient.cures.treatments) {
      patient.cures.treatments.forEach(element => {
        treatments += element + ', ';
      });
    }
    const session = {
      date: patient.date,
      patientId: patient.id,
      patientName: patient.basic.name,
      chiefComplain: patient.assesments.chiefComplain,
      sessionNumber: 1,
      treatments: treatments,
      comments: 'First session',
      sessionFee: patient.fees.sessionFee
    } as PSession;
    await this.sessionService.create(session);
  }

  async createLedter(patient: Patient) {
    const pledger = {
      patientId: patient.id,
      date: patient.date,
      explanation: 'First session ',
      debit: patient.fees.prescribeFee,
      credit: 0,
      balance: patient.fees.prescribeFee
    } as PatientLedger;

    await this.patientLedgerService.create(pledger);
  }

  cleanObject(myObj) {
    Object.keys(myObj).forEach(
      key =>
        (myObj[key] == null || myObj[key] == undefined || myObj[key] == '') &&
        delete myObj[key]
    );
    return myObj;
  }

  updateDateObject(d: any): Date {
    let dumy = new Date(d);
    const dat = new Date();
    dat.setFullYear(dumy.getFullYear());
    dat.setMonth(dumy.getMonth());
    dat.setDate(dumy.getDate());
    return dat;
  }
}

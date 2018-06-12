import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Patient } from '../../../shared/models/patient.model';
import { PatientService } from '../../../shared/services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new',
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
        if (!this.exists) {
          //create diff date specially different time for session
          let dumy = new Date(patient.date);
          const dat = new Date();
          dat.setFullYear(dumy.getFullYear());
          dat.setMonth(dumy.getMonth());
          dat.setDate(dumy.getDate());

          patient.date = dat;
          patient.balance = patient.fees.prescribeFee;
          patient.totalSession = 1;

          this.patientService.create(patient).then(ref => {
            console.log('ref ', ref);
            patient.id = ref.id;
            this.form.reset();
            this.currentForm = 1;
            this.currentTitle = 'সাধারণ তথ্য';
            // this.createSession(patient);
            // this.createLedter(patient);
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

  cleanObject(myObj) {
    Object.keys(myObj).forEach(
      key =>
        (myObj[key] == null || myObj[key] == undefined || myObj[key] == '') &&
        delete myObj[key]
    );
    return myObj;
  }
}

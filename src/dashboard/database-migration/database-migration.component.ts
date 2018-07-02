import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../shared/services/patient.service';
import { Patient } from '../../shared/models/patient.model';
import { SessionService } from '../../shared/services/session.service';
import { PSession } from '../../shared/models/session.model';
import { PatientLedgerService } from '../../shared/services/patient-ledger.service';
import { PatientLedger } from '../../shared/models/patient-ledger.model';
import { CashBookService } from '../../shared/services/cashbook.service';
import { Cashbook } from '../../shared/models/cashbook.model';

@Component({
  selector: 'app-database-migration',
  templateUrl: './database-migration.component.html',
  styleUrls: ['./database-migration.component.scss']
})
export class DatabaseMigrationComponent implements OnInit {
  companyId;
  sessions: PSession;

  constructor(private cashbookService: CashBookService) {
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    await this.cashbookService.getAll(this.companyId).subscribe(data => {
      console.log(data.length);
      data.forEach(cash => {
        console.log(cash);
        // const value = { ...cash, createdAt: cash.createdDate } as Cashbook;
        // delete value['createdDate'];
        // console.log(value);
        // this.cashbookService
        //   .update(value.id, value)
        //   .then(ref => console.log('done'));
      });
    });
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

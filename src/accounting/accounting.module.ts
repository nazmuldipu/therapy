import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectFeeComponent } from './containers/collect-fee/collect-fee.component';
import { CashbookComponent } from './containers/cashbook/cashbook.component';
import { IncomeComponent } from './containers/income/income.component';
import { ExpenseComponent } from './containers/expense/expense.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FeeFormComponent } from './components/fee-form/fee-form.component';
import { CashbookItemComponent } from './components/cashbook-item/cashbook-item.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { IncomeFormComponent } from './components/income-form/income-form.component';
import { CashbookTableComponent } from './components/cashbook-table/cashbook-table.component';

// routes
export const ROUTES: Routes = [
  {
    path: 'collect-fee',
    component: CollectFeeComponent
  },
  {
    path: 'cashbook',
    component: CashbookComponent
  },
  {
    path: 'income',
    component: IncomeComponent
  },
  {
    path: 'expense',
    component: ExpenseComponent
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(ROUTES)],
  declarations: [
    CollectFeeComponent,
    CashbookComponent,
    IncomeComponent,
    ExpenseComponent,
    FeeFormComponent,
    CashbookItemComponent,
    ExpenseFormComponent,
    IncomeFormComponent,
    CashbookTableComponent
  ]
})
export class AccountingModule {}

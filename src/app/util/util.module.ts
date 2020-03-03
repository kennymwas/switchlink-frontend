import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UtilRoutingModule} from './util-routing.module';
import {DateFilterComponent} from './date-filter/date-filter.component';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {CustomDatatableComponent} from './custom-datatable/custom-datatable.component';
import {DataTablesModule} from 'angular-datatables';
import {ExportService} from './export.service';
import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from '@angular/material/form-field';
import {TransactionTypeComponent} from './transaction-type/transaction-type.component';
import {BalanceDialogComponent} from './transaction-type/balance-dialog/balance-dialog.component';
import {DepositDialogComponent} from './transaction-type/deposit-dialog/deposit-dialog.component';
import {WithdrawDialogComponent} from './transaction-type/withdraw-dialog/withdraw-dialog.component';
import {TransferDialogComponent} from './transaction-type/transfer-dialog/transfer-dialog.component';

@NgModule({
  declarations: [
    DateFilterComponent,
    CustomDatatableComponent,
    TransactionTypeComponent,
    BalanceDialogComponent,
    DepositDialogComponent,
    WithdrawDialogComponent,
    TransferDialogComponent
  ],
  imports: [
    CommonModule,
    UtilRoutingModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    DataTablesModule
  ],
  exports: [
    CustomDatatableComponent,
    TransactionTypeComponent,
    BalanceDialogComponent,
    DepositDialogComponent,
    WithdrawDialogComponent,
    TransferDialogComponent
  ],
  entryComponents: [
    BalanceDialogComponent,
    DepositDialogComponent,
    WithdrawDialogComponent,
    TransferDialogComponent
  ],
  providers: [
    ExportService
  ]
})
export class UtilModule {
}

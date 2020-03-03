import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TransferDialogComponent} from './transfer-dialog/transfer-dialog.component';
import {DepositDialogComponent} from './deposit-dialog/deposit-dialog.component';
import {WithdrawDialogComponent} from './withdraw-dialog/withdraw-dialog.component';
import {BalanceDialogComponent} from './balance-dialog/balance-dialog.component';

@Component({
  selector: 'app-transaction-type',
  templateUrl: './transaction-type.component.html',
  styleUrls: ['./transaction-type.component.scss']
})
export class TransactionTypeComponent {
  transfer_endpoint: string;
  deposit_endpoint: string;
  withdraw_endpoint: string;
  balance_endpoint: string;

  constructor(
    public dialog: MatDialog
  ) {
    this.transfer_endpoint = 'api/v1/transfer';
    this.deposit_endpoint = 'api/v1/deposit';
    this.withdraw_endpoint = 'api/v1/withdraw';
    this.balance_endpoint = 'api/v1/check_balance';
  }

  transferConfirm() {
    this.dialog.open(TransferDialogComponent, {
      width: '800px',
      data: {
        endpoint: this.transfer_endpoint
      }
    });

  }

  depositConfirm() {
    this.dialog.open(DepositDialogComponent, {
      width: '800px',
      data: {
        endpoint: this.deposit_endpoint
      }
    });

  }

  withdrawConfirm() {
    this.dialog.open(WithdrawDialogComponent, {
      width: '800px',
      data: {
        endpoint: this.withdraw_endpoint
      }
    });

  }

  balanceConfirm() {
    this.dialog.open(BalanceDialogComponent, {
      width: '800px',
      data: {
        endpoint: this.balance_endpoint
      }
    });

  }
}

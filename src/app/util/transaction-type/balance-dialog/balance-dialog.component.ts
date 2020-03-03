import {Component, Inject, OnInit} from '@angular/core';
import {AccountWrapper} from '../../../entities/wrappers/account-wrapper';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Notify} from '../../../shared/classes/notify';
import {StewardService} from '../../../shared/services/steward.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-balance-dialog',
  templateUrl: './balance-dialog.component.html',
  styleUrls: ['./balance-dialog.component.scss']
})
export class BalanceDialogComponent implements OnInit {

  model: AccountWrapper;
  endpoint: string;
  balance: any;
  isSuccess: boolean;

  constructor(
    public dialogRef: MatDialogRef<BalanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected router: Router,
    private notify: Notify,
    private stewardService: StewardService<any, any>) {
    this.model = new AccountWrapper();
    this.endpoint = data.endpoint;
  }

  ngOnInit() {
  }

  submitForm(balanceForm: NgForm) {
    this.stewardService.post(this.endpoint, this.model).subscribe((response) => {
      if (response.code === 200) {
        this.isSuccess = true;
        this.balance = response.data;
        this.notify.showSuccess(response.message);
      } else {
        balanceForm.resetForm();
        this.dialogRef.close();
        this.notify.showWarning(response.message);
      }
    }, error => {
      console.log(error);
    });
  }
}

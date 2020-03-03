import {Component, Inject, OnInit} from '@angular/core';
import {AccountWrapper} from '../../../entities/wrappers/account-wrapper';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Notify} from '../../../shared/classes/notify';
import {StewardService} from '../../../shared/services/steward.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-withdraw-dialog',
  templateUrl: './withdraw-dialog.component.html',
  styleUrls: ['./withdraw-dialog.component.scss']
})
export class WithdrawDialogComponent implements OnInit {

  model: AccountWrapper;
  endpoint: string;

  constructor(
    public dialogRef: MatDialogRef<WithdrawDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected router: Router,
    private notify: Notify,
    private stewardService: StewardService<any, any>) {
    this.model = new AccountWrapper();
    this.endpoint = data.endpoint;
  }

  ngOnInit() {
  }

  submitForm(withdrawForm: NgForm) {
    this.stewardService.post(this.endpoint, this.model).subscribe((response) => {
      if (response.code === 200) {
        withdrawForm.resetForm();
        this.dialogRef.close();
        this.notify.showSuccess(response.message);
        this.router.navigate(['/home/transactions']);
      } else {
        withdrawForm.resetForm();
        this.dialogRef.close();
        this.notify.showWarning(response.message);
      }
    }, error => {
      console.log(error);
    });
  }
}

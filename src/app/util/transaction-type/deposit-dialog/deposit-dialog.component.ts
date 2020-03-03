import {Component, Inject, OnInit} from '@angular/core';
import {AccountWrapper} from '../../../entities/wrappers/account-wrapper';
import {NgForm} from '@angular/forms';
import {StewardService} from '../../../shared/services/steward.service';
import {Notify} from '../../../shared/classes/notify';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-deposit-dialog',
  templateUrl: './deposit-dialog.component.html',
  styleUrls: ['./deposit-dialog.component.scss']
})
export class DepositDialogComponent implements OnInit {

  model: AccountWrapper;
  endpoint: string;

  constructor(
    public dialogRef: MatDialogRef<DepositDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected router: Router,
    private notify: Notify,
    private stewardService: StewardService<any, any>) {
    this.model = new AccountWrapper();
    this.endpoint = data.endpoint;
  }

  ngOnInit() {
  }

  submitForm(depositForm: NgForm) {
    this.stewardService.post(this.endpoint, this.model).subscribe((response) => {
      if (response.code === 200) {
        this.notify.showSuccess(response.message);
        this.router.navigate(['/home/transactions'], {replaceUrl: true});
        depositForm.resetForm();
        $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
        this.dialogRef.close();
      } else {
        depositForm.resetForm();
        this.notify.showWarning(response.message);
      }
    }, error => {
      console.log(error);
    });
  }
}

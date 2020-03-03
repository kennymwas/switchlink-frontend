import {Component, Inject, OnInit} from '@angular/core';
import {AccountWrapper} from '../../../entities/wrappers/account-wrapper';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Notify} from '../../../shared/classes/notify';
import {StewardService} from '../../../shared/services/steward.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-transfer-dialog',
  templateUrl: './transfer-dialog.component.html',
  styleUrls: ['./transfer-dialog.component.scss']
})
export class TransferDialogComponent implements OnInit {

  model: AccountWrapper;
  endpoint: string;

  constructor(
    public dialogRef: MatDialogRef<TransferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected router: Router,
    private notify: Notify,
    private stewardService: StewardService<any, any>) {
    this.model = new AccountWrapper();
    this.endpoint = data.endpoint;
  }

  ngOnInit() {
  }

  submitForm(transferForm: NgForm) {
    this.stewardService.post(this.endpoint, this.model).subscribe((response) => {
      if (response.code === 200) {
        transferForm.resetForm();
        this.dialogRef.close();
        this.notify.showSuccess(response.message);
        this.router.navigate(['/home/transactions']);
      } else {
        transferForm.resetForm();
        this.dialogRef.close();
        this.notify.showWarning(response.message);
      }
    }, error => {
      console.log(error);
    });

  }
}

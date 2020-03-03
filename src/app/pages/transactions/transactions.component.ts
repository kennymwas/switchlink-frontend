import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  cols: Array<DatatableColumns>;
  endpoint = 'api/v1/transactions/all/' + localStorage.getItem('userId');
  routeView = '';
  hasCheckBox = true;
  idColumn = 'id';

  constructor() {
    this.cols = [];
  }

  ngOnInit() {
    this.cols.push({
      isCheckBox: true,
      title: '',
      data: 'id'
    });
    this.cols.push({
      title: 'Transaction Type',
      data: 'transactionType'
    });
    this.cols.push({
      title: 'Account Number',
      data: 'accountNumber'
    });
    this.cols.push({
      title: 'Description',
      data: 'description'
    });
    this.cols.push({
      title: 'Amount',
      data: 'amount'
    });
    this.cols.push({
      title: 'Transfer Account',
      data: 'transferAccountNumber'
    });
    this.cols.push({
      title: 'Creation Date',
      data: 'creationDate',
      isDate: true
    });
  }

}

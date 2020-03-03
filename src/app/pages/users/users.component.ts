import { Component, OnInit } from '@angular/core';
import {DatatableColumns} from '../../entities/datatable/datatable-columns';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  cols: Array<DatatableColumns>;
  endpoint = 'api/v1/user';
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
      title: 'User Name',
      data: 'userName'
    });
    this.cols.push({
      title: 'Role',
      data: 'role'
    });
    this.cols.push({
      title: 'Enabled',
      data: 'enabled'
    });
  }


}

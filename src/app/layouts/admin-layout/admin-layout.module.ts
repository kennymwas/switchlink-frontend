import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Notify} from '../../shared/classes/notify';
import {TransactionsComponent} from '../../pages/transactions/transactions.component';
import {UtilModule} from '../../util/util.module';
import {UsersComponent} from '../../pages/users/users.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    UtilModule,
    MatCardModule
  ],
  declarations: [
    TransactionsComponent,
    UsersComponent
  ],
  providers: [
    Notify
  ]
})

export class AdminLayoutModule {}

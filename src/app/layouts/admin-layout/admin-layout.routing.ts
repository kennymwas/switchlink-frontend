import {Routes} from '@angular/router';

import {AuthGuard} from '../../shared/guard/auth.guard';
import {TransactionsComponent} from '../../pages/transactions/transactions.component';
import {UsersComponent} from '../../pages/users/users.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
];

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthLayoutRoutes} from './auth-layout.routing';

import {LoginComponent} from '../../pages/login/login.component';
import {Notify} from '../../shared/classes/notify';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule
  ],
  declarations: [
    LoginComponent,

  ],
  providers: [
    Notify
  ]
})
export class AuthLayoutModule {
}

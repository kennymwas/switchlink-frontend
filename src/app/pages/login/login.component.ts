import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {StewardService} from '../../shared/services/steward.service';
import {Notify} from '../../shared/classes/notify';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  model: any = {};
  isFailed = false;
  message: string;

  constructor(
    public router: Router,
    public notify: Notify,
    private stewardService: StewardService<any, any>,
  ) {
  }

  ngOnInit() {
    localStorage.clear();
  }

  ngOnDestroy() {
  }

  onLoggedin(loginForm: NgForm) {
    const params = new URLSearchParams();
    params.append('username', this.model.email);
    params.append('password', this.model.password);
    params.append('grant_type', 'password');

    this.stewardService.postLogin('api/v1/oauth/token', params.toString())
      .subscribe((response) => {
          if (response.code === 400) {
            this.notify.showWarning('Bad Credentials');
          } else if (response.code === 200) {
            localStorage.setItem('isLoggedin', String(true));
            this.router.navigate(['/home/transactions'], {replaceUrl: true});
          } else {
            if (response.access_token.length !== 0) {
              localStorage.setItem('access_token', response.access_token);
              localStorage.setItem('isLoggedin', String(true));
              this.stewardService.post('api/v1/user/me?access_token=' + response.access_token, {}).subscribe((tokenResp) => {
                if (tokenResp.code === 200){
                   localStorage.setItem('userId', tokenResp.data.id);
                   this.router.navigate(['/home/transactions'], {state: {data: {'token': response.access_token}}});
                }else{
                  this.notify.showWarning('Bad Credentials');
                }
              });


            } else {
              this.notify.showWarning('Invalid Access Token');
            }

          }
        },
        error => {
          if (error.error.message === 'Sorry password has expired') {
            this.router.navigate(['/login']);
          } else {
            this.isFailed = true;
            this.message = error.error.message;
            this.notify.show(this.message);
          }
        });
  }
}

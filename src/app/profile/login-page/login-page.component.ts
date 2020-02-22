import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {AuthService, User} from '../../services/auth.service';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['accessDenied']) {
        this.message = 'Access is denied. Perhaps you do not have the necessary rights. Try sign in or get the necessary administrator privileges';
      }
    });
  }

  submit() {
    if (this.form.invalid) { return; }
    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user)
      .pipe(
        flatMap(() => {
          return this.auth.getUserInfo();
        })
      )
      .subscribe(
        userInfoResponse => {
          this.form.reset();
          const user: User = userInfoResponse.authUser;
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['profile', user.id]);
          this.submitted = false;
      },
        () => {
          this.submitted = false;
        }
    );
  }

  facebookSubmit() {
    this.auth.socialLogin();
  }

  twitterSubmit() {
    return null;
  }
}

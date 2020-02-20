import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {User} from '../../interfaces/interfaces';
import {AuthService} from '../../services/auth.service';
import {AuthGuard} from '../../services/auth.guard';

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
    private route: ActivatedRoute) { } /*public to use in template*/

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
      if (params['loginAgain']) {
        this.message = 'Please, sign in';
      } else if (params['authFailed']) {
        this.message = 'Session finish/ Please, sign in again';
      }
    });
  }

/*  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['profile', 'id'])
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }*/

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['profile', 'id'])
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

  facebookSubmit() {
    this.auth.socialLogin();
  }

  twitterSubmit() {
    this.auth.socialLogin();
  }
}

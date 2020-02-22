import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService, User} from '../../services/auth.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html'
})
export class RegistrationPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    public auth: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      email: new FormControl(null,[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  submit() {
    if (this.form.invalid) { return; }
    this.submitted = true;
    const user: User = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.registration(user)
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
}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../interfaces/interfaces';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.registration(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['profile', 'id'])
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }
}

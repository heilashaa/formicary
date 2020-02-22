import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {AuthorizationService, User} from '../../services/authorization.service';
import {flatMap} from 'rxjs/operators';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  message: string;

  socialUser: SocialUser;
  loggedIn: boolean;
  user: User;

  fbSubscription: Subscription;
  googleSubscription: Subscription;



  constructor(
    public auth: AuthorizationService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {
  }

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

  ngOnDestroy(): void {}

  submit() {
    if (this.form.invalid) {
      return;
    }
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

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.fbSubscription = this.authService.authState.subscribe((socialUser) => {
      this.socialUser = socialUser;
      this.loggedIn = (socialUser != null);
      console.log('FB_SOCIAL_USER', this.socialUser);
      if (this.socialUser != null) {
        this.submitted = true;
        const user: User = {
          username: this.socialUser.firstName,
          email: this.socialUser.email,
          password: this.socialUser.email
        };
        this.auth.socialLogin(user)
          .pipe(
            flatMap(() => {
              return this.auth.getUserInfo();
            })
          )
          .subscribe(
            userInfoResponse => {
              const user: User = userInfoResponse.authUser;
              localStorage.setItem('user', JSON.stringify(user));
              this.router.navigate(['profile', user.id]);
              this.submitted = false;
            },
            () => {
              this.submitted = false;
            }
          );
        this.fbSubscription.unsubscribe();
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.googleSubscription = this.authService.authState.subscribe((socialUser) => {
      this.socialUser = socialUser;
      this.loggedIn = (socialUser != null);
      console.log('GOOGLE_SOCIAL_USER', this.socialUser);
      if (this.socialUser != null) {
        this.submitted = true;
        const user: User = {
          username: this.socialUser.firstName,
          email: this.socialUser.email,
          password: this.socialUser.email
        };
        this.auth.socialLogin(user)
          .pipe(
            flatMap(() => {
              return this.auth.getUserInfo();
            })
          )
          .subscribe(
            userInfoResponse => {
              const user: User = userInfoResponse.authUser;
              localStorage.setItem('user', JSON.stringify(user));
              this.router.navigate(['profile', user.id]);
              this.submitted = false;
            },
            () => {
              this.submitted = false;
            }
          );
        this.googleSubscription.unsubscribe();
      }
    });
  }
}

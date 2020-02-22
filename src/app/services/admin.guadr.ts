import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthorizationService} from './authorization.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    public auth: AuthorizationService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAdmin()) {
      return true;
    } else if (this.auth.token) {
      if (route.params.user_id.toString() === this.auth.id.toString()) {
        console.log('REDIRECT_IF_IT_YOU_PROFILE_ID: ', route.params.user_id);
        return true;
      }
      console.log('REDIRECT_IF_TRY_GET_ANOTHER_ID: ', route.params.user_id);
      this.router.navigate(['/profile', this.auth.id]);
      return false;
    } else {
      this.auth.logout();
      this.router.navigate(['/profile', 'login'], {
        queryParams: {
          accessDenied: true
        }
      });
    }
  }
}

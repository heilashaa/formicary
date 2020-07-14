import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthorizationService} from './authorization.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    public auth: AuthorizationService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/profile', JSON.parse(localStorage.getItem('user')).id]);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import * as MatCss from 'materialize-css/dist/js/materialize';
import {Router} from '@angular/router';
import {AuthorizationService} from '../../services/authorization.service';


@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {

  constructor(private router: Router, public auth: AuthorizationService) {}

  ngOnInit(): void {
    MatCss.AutoInit();
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/profile', 'login']);
  }

  undo(event: Event) {
    event.preventDefault();
  }
}

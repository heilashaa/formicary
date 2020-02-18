import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    M.AutoInit();
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/profile', 'login']);
  }
}

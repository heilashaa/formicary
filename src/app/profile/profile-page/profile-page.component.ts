import { Component, OnInit } from '@angular/core';

import {AuthorizationService} from '../../services/authorization.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));

  constructor(private auth: AuthorizationService) { }

  ngOnInit(): void {}
}

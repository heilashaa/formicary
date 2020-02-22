import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }
}

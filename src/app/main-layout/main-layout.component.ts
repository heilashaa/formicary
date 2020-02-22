import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import {AuthorizationService} from '../services/authorization.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {

  constructor(private auth: AuthorizationService) { }

  ngOnInit(): void {
    M.AutoInit();
  }

}

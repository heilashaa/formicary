import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    M.AutoInit();
  }

}

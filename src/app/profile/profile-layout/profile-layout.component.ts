import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';


@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    M.AutoInit();
  }

}

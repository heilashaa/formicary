import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    M.AutoInit();
  }

}

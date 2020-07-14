import {Component, OnInit} from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    M.AutoInit();
  }
}

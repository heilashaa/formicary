import {Component, OnInit} from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  count: number = 0;
  name: string;
  increase($event: any): void {
    this.count++;
    console.log($event);
  }
  ngOnInit(): void {
    M.AutoInit();
  }
}

import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-campaign-page',
  templateUrl: './campaign-page.component.html',
  styleUrls: ['./campaign-page.component.scss']
})
export class CampaignPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    M.AutoInit();
  }

}

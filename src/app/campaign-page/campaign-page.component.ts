import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import {AuthorizationService} from '../services/authorization.service';
import {ActivatedRoute} from '@angular/router';
import {Bonus, Campaign, CampaignService} from '../services/campaign.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-campaign-page',
  templateUrl: './campaign-page.component.html',
  styleUrls: ['./campaign-page.component.scss']
})
export class CampaignPageComponent implements OnInit {

  campaign: Campaign;
  campaignId: string;
  userId: string;
  bonuses: Bonus[];


  constructor(private auth: AuthorizationService,
              private route: ActivatedRoute,
              private campaignService: CampaignService) {

  }

  ngOnInit() {
    M.AutoInit();

    this.campaignService.getCampaignById(this.campaignId).subscribe((data) =>{
      this.campaign = data;
      this.userId = data.user.id;
    });

    console.log('CAMPAIGN', this.campaign);
  }

}

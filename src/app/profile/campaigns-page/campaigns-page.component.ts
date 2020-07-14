import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthorizationService} from '../../services/authorization.service';
import {Campaign, CampaignService} from '../../services/campaign.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-campaigns-page',
  templateUrl: './campaigns-page.component.html',
  styleUrls: ['./campaigns-page.component.scss']
})
export class CampaignsPageComponent implements OnInit, OnDestroy {

  userId: string;
  campaigns: Campaign[];
  pSub: Subscription;
  filterStr = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private campaignService: CampaignService,
              private auth: AuthorizationService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.user_id.toString();
    this.pSub = this.campaignService.getAllUsersCampaigns(this.userId).subscribe(data => {
      this.campaigns = data;
      console.log('ALL_USERS_CAMPAIGN', data);
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

}

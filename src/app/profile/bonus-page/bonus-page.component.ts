import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bonus, CampaignService} from '../../services/campaign.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthorizationService} from '../../services/authorization.service';

@Component({
  selector: 'app-bonus-page',
  templateUrl: './bonus-page.component.html',
  styleUrls: ['./bonus-page.component.scss']
})
export class BonusPageComponent implements OnInit, OnDestroy {

  userId: string;
  campaignId: string;
  bonuses: Bonus[];
  pSub: Subscription;
  dSub: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private campaignService: CampaignService,
              private auth: AuthorizationService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.user_id.toString();
    this.campaignId = this.route.snapshot.params.camp_id.toString();
    this.pSub = this.campaignService.getAllCampaignsBonuses(this.userId, this.campaignId).subscribe(data => {
      this.bonuses = data;
      console.log('ALL_CAMPAIGNS_BONUSES', data);
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  // delete(id: string) {
  //   this.dSub = this.campaignService.removeBonus(this.userId, this.campaignId, id)
  //     .subscribe(() => {
  //       this.bonuses = this.bonuses.filter((bonus) => {bonus.id !== id});
  //       this.router.navigate(['profile', this.userId , 'campaign', this.campaignId, 'edit']);
  //     });
  // }
}

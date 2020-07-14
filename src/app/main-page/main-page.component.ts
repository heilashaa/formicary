import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bonus, Campaign, CampaignService} from '../services/campaign.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit, OnDestroy {

  campaignByModification$: Observable<Campaign[]>;
  public allTags: any;

  tSub: Subscription;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {

    this.campaignByModification$ = this.campaignService.getAllCampaignsSortingByParams('modificationDate');

/*    this.tSub = this.campaignService.getTags().subscribe((data) => {
      this.allTags = data;
      console.log('TAGS' , this.allTags);
    });*/
  }

  ngOnDestroy() {
/*    if (this.tSub) {
      this.tSub.unsubscribe();
    }*/
  }
}

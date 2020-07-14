import {Component, Input, OnInit} from '@angular/core';
import {Campaign} from '../../services/campaign.service';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html'
})
export class CampaignCardComponent implements OnInit {

  @Input() campaign: Campaign;

  constructor() { }

  ngOnInit() {}

}

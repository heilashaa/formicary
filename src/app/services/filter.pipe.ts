import {Pipe, PipeTransform} from '@angular/core';
import {Campaign} from './campaign.service';

@Pipe({
  name: 'filterCampaigns'
})

export class FilterPipe implements PipeTransform {
  transform(campaigns: Campaign[], filter = ''): Campaign[] {
    if (!filter.trim()) {
      return campaigns;
    }
    return campaigns.filter((campaign) => {
      return campaign.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
}

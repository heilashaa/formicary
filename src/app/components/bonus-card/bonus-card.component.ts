import {Component, Input, OnInit} from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';
import {Bonus} from '../../services/campaign.service';

@Component({
  selector: 'app-bonus-card',
  templateUrl: './bonus-card.component.html'
})
export class BonusCardComponent implements OnInit {

  @Input() bonus: Bonus;

  constructor(private auth: AuthorizationService) { }

  ngOnInit() {}

  by(id: number) {
    return null;
  }
}

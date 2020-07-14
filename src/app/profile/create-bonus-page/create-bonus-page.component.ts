import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Bonus, CampaignService} from '../../services/campaign.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthorizationService} from '../../services/authorization.service';
import * as M from 'materialize-css/dist/js/materialize';


@Component({
  selector: 'app-create-bonus-page',
  templateUrl: './create-bonus-page.component.html',
  styleUrls: ['./create-bonus-page.component.scss']
})
export class CreateBonusPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  userId: string;
  campaignId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private campaignService: CampaignService,
    private auth: AuthorizationService) {
  }

  ngOnInit() {

    this.userId = this.route.snapshot.params.user_id.toString();
    this.campaignId = this.route.snapshot.params.camp_id.toString();

    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
      description: new FormControl(null),
      amount: new FormControl(null, [
        Validators.required,
        Validators.min(1)
      ])
    });

    M.AutoInit();
  }

  submit() {
    if (this.form.invalid) {return}
    this.submitted = true;

    const bonus: Bonus = {
      name: this.form.value.title,
      description: this.form.value.description,
      amount: this.form.value.amount,
    };
    console.log('CREATED_BONUS', bonus);
    this.campaignService.createBonus(bonus, this.userId, this.campaignId).subscribe(
      (response) => {
        this.router.navigate(['profile', this.userId , 'campaign', this.campaignId, 'bonus']);
        this.form.reset();
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }
}

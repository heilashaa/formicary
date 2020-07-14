import {Component, OnDestroy, OnInit} from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Campaign, CampaignService, Category} from '../../services/campaign.service';
import {AuthorizationService} from '../../services/authorization.service';
import {EmbedVideoService} from 'ngx-embed-video/dist';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Tag} from '@angular/compiler/src/i18n/serializers/xml_helper';


@Component({
  selector: 'app-edit-campaign-page',
  templateUrl: './edit-campaign-page.component.html',
  styleUrls: ['./edit-campaign-page.component.scss']
})
export class EditCampaignPageComponent implements OnInit, OnDestroy {


  form: FormGroup;

  submitted = false;
  categories: Category[];
  existingTags: string[];
  campaignChips: any[];
  userId: string;
  campaignId: string;
  uSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private http: HttpClient,
    private auth: AuthorizationService,
    private embedService: EmbedVideoService) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params.user_id.toString();
    this.campaignId = this.route.snapshot.params.camp_id.toString();

    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.campaignService.getCampaignById(params['camp_id']);
      })
    ).subscribe((campaign: Campaign) => {
      this.form = new FormGroup({
        title: new FormControl(campaign.name, [
          Validators.required,
          Validators.minLength(5)
        ]),
        category: new FormControl(campaign.category.name, [
          Validators.required
        ]),
        description: new FormControl(campaign.description),
        target: new FormControl(campaign.targetAmount, [
          Validators.required,
          Validators.min(1)
        ]),
        expiration: new FormControl( new Date(campaign.expirationDate), [
          Validators.required
        ]),
        youtube: new FormControl(campaign.video)
      });

      this.campaignChips = campaign.tags.map(item =>
        item/* = {display: item.name, value: item.name}*/);
    })

    this.campaignService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log('CATEGORIES', this.categories);
    });


    this.campaignService.getTags().subscribe((data) => {
      this.existingTags = data.reverse().splice(0, 7);
      console.log('TAGS', this.existingTags);
    });

    M.AutoInit();
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {return}
    this.submitted = true;

    console.log('CHIPS', this.campaignChips);
    if (this.campaignChips) {
      this.campaignChips = this.campaignChips.map((item) => item = {name: item.value});
      console.log('FINAL_TAGS', this.campaignChips);
    }

    const campaign: Campaign = {
      id: +this.campaignId,
      name: this.form.value.title,
      category: {id: this.form.value.category.id},
      description: this.form.value.description,
      targetAmount: this.form.value.target,
      expirationDate: new Date(this.form.value.expiration),
      video: this.form.value.youtube,
      tags: this.campaignChips
    };
    console.log('UPDATE_CAMPAIGN_REQUEST', campaign);

    this.uSub = this.campaignService.updateCampaign(campaign, this.userId).subscribe(
      (response) => {

        this.router.navigate(['profile', this.userId , 'campaign']);
        this.submitted = false;

      },
      () => {
        this.submitted = false;
      }
    );
  }


}

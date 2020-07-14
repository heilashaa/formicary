import {Component, OnInit} from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Campaign, CampaignService, Category} from '../../services/campaign.service';
import {AuthorizationService} from '../../services/authorization.service';
import {EmbedVideoService} from 'ngx-embed-video/dist';

@Component({
  selector: 'app-create-campaign-page',
  templateUrl: './create-campaign-page.component.html',
  styleUrls: ['./create-campaign-page.component.scss']
})
export class CreateCampaignPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  categories: Category[];
  existingTags: string[];
  campaignChips: any[];
  userId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private campaignService: CampaignService,
    private auth: AuthorizationService,
    private embedService: EmbedVideoService) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params.user_id.toString();
    this.campaignService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log('CATEGORIES', this.categories);
    });

    this.campaignService.getTags().subscribe((data) => {
      this.existingTags = data.reverse().splice(0, 5);
      console.log('TAGS', this.existingTags);
    });

    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
      category: new FormControl(null, [
        Validators.required
      ]),
      description: new FormControl(null),
      target: new FormControl(null, [
        Validators.required,
        Validators.min(1)
      ]),
      expiration: new FormControl( new Date(), [
        Validators.required
      ]),
      youtube: new FormControl(null)
    });

    M.AutoInit();

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
      name: this.form.value.title,
      category: {id: this.form.value.category},
      description: this.form.value.description,
      targetAmount: this.form.value.target,
      expirationDate: new Date(this.form.value.expiration),
      video: this.form.value.youtube,
      tags: this.campaignChips
    };
    console.log('CREATED_CAMPAIGN_REQUEST', campaign);
    this.campaignService.createCampaign(campaign, this.userId).subscribe(
      (response) => {

        this.router.navigate(['profile', this.userId , 'campaign', response.id , 'edit']);
        this.form.reset();
        this.submitted = false;

      },
      () => {
        this.submitted = false;
      }
    );
  }
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProfileLayoutComponent} from './profile-layout/profile-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegistrationPageComponent} from './registration-page/registration-page.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {EditCampaignPageComponent} from './edit-campaign-page/edit-campaign-page.component';
import {CampaignsPageComponent} from './campaigns-page/campaigns-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from '../services/auth.guard';
import {LoginGuard} from '../services/login.guadr';
import {AdminGuard} from '../services/admin.guadr';
import {TagInputModule} from 'ngx-chips';
import {CreateCampaignPageComponent} from './create-campaign-page/create-campaign-page.component';
import {QuillModule} from 'ngx-quill';
import {EmbedVideo} from 'ngx-embed-video/dist';
import {FilterPipe} from '../services/filter.pipe';
import { BonusPageComponent } from './bonus-page/bonus-page.component';
import { CreateBonusPageComponent } from './create-bonus-page/create-bonus-page.component';

const routes: Routes = [
  {
    path: '', component: ProfileLayoutComponent, children: [
      {path: '', redirectTo: '/profile/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent, canActivate: [LoginGuard]},
      {path: 'registration', component: RegistrationPageComponent, canActivate: [LoginGuard]},
      {path: ':user_id', component: ProfilePageComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: ':user_id/campaign/:camp_id/edit', component: EditCampaignPageComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: ':user_id/campaign', component: CampaignsPageComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: ':user_id/campaign/create', component: CreateCampaignPageComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: ':user_id/campaign/:camp_id/bonus', component: BonusPageComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: ':user_id/campaign/:camp_id/bonus/create', component: CreateBonusPageComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: ':user_id/campaign/:camp_id/bonus/:bonus_id/edit', component: EditCampaignPageComponent, canActivate: [AuthGuard, AdminGuard]}
    ]
  }
];

@NgModule({
  declarations: [
    ProfileLayoutComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    ProfilePageComponent,
    EditCampaignPageComponent,
    CampaignsPageComponent,
    CreateCampaignPageComponent,
    FilterPipe,
    BonusPageComponent,
    CreateBonusPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    TagInputModule,
    QuillModule,
    EmbedVideo.forRoot()
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class ProfileModule {}

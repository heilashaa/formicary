import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CreateCampaignPageComponent } from './create-campaign-page/create-campaign-page.component';
import { EditCampaignPageComponent } from './edit-campaign-page/edit-campaign-page.component';

const routes: Routes = [
  {
    path: '', component: ProfileLayoutComponent, children: [
      {path: '', redirectTo: '/profile/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'registration', component: RegistrationPageComponent},
      {path: ':id', component: ProfilePageComponent},
      {path: ':id/campaign', component: CreateCampaignPageComponent},
      {path: ':id/campaign/:c_id/edit', component: EditCampaignPageComponent}
    ]
  }
];

@NgModule({
  declarations: [
    ProfileLayoutComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    ProfilePageComponent,
    CreateCampaignPageComponent,
    EditCampaignPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class ProfileModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { EditCampaignPageComponent } from './edit-campaign-page/edit-campaign-page.component';
import { CampaignsPageComponent } from './campaigns-page/campaigns-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {AuthGuard} from '../services/auth.guard';

const routes: Routes = [
  {
    path: '', component: ProfileLayoutComponent, children: [
      {path: '', redirectTo: '/profile/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'registration', component: RegistrationPageComponent},
      {path: ':id', component: ProfilePageComponent, canActivate: [AuthGuard]},
      {path: ':id/campaign/:c_id/edit', component: EditCampaignPageComponent, canActivate: [AuthGuard]},
      {path: ':id/campaign', component: CampaignsPageComponent, canActivate: [AuthGuard]}
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
    CampaignsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  exports: [
    RouterModule
  ],
  providers: [/*AuthService, AuthGuard*/]
})

export class ProfileModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

const routes: Routes = [
  {
    path: '', component: ProfileLayoutComponent, children: [
      {path: }
    ]
  }
];

@NgModule({
  declarations: [
    ProfileLayoutComponent,
    LoginPageComponent,
    RegistrationPageComponent
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

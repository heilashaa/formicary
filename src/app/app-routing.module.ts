import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {MainPageComponent} from './main-page/main-page.component';
import {CampaignPageComponent} from './campaign-page/campaign-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'}, /*for redirecting from MainLayout to MainPage*/
      {path: '', component: MainPageComponent},
      {path: 'campaign/:id', component: CampaignPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

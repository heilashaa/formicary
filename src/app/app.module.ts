import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignCardComponent } from './campaign-card/campaign-card.component';
import { ArticleComponent } from './article/article.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CampaignPageComponent } from './campaign-page/campaign-page.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'}, /*for redirecting from MainLayout to MainPage*/
      {path: '', component: MainPageComponent},
      {path: 'campaign/:id', component: CampaignPageComponent}
    ]
  },
  {
    path: 'profile', loadChildren: './profile/profile.module#ProfileModule' /*loadChildren for lazy loading*/
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CampaignComponent,
    CampaignCardComponent,
    ArticleComponent,
    MainPageComponent,
    CampaignPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

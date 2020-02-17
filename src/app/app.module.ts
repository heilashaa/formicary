import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CampaignCardComponent } from './components/campaign-card/campaign-card.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CampaignPageComponent } from './campaign-page/campaign-page.component';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { BonusCardComponent } from './components/bonus-card/bonus-card.component';
import { ArticlePageComponent } from './article-page/article-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'}, /*for redirecting from MainLayout to MainPage*/
      {path: '', component: MainPageComponent},
      {path: 'campaign/:id', component: CampaignPageComponent},
      {path: 'campaign/:id/article/:a_id', component: ArticlePageComponent}
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
    CampaignCardComponent,
    MainPageComponent,
    CampaignPageComponent,
    ArticleCardComponent,
    BonusCardComponent,
    ArticlePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

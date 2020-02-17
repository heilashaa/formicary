import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from './auth/auth.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignCardComponent } from './campaign-card/campaign-card.component';
import { ArticleComponent } from './article/article.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CampaignPageComponent } from './campaign-page/campaign-page.component';

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
    AppRoutingModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

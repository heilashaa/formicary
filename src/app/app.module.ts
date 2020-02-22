import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CampaignCardComponent } from './components/campaign-card/campaign-card.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CampaignPageComponent } from './campaign-page/campaign-page.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { BonusCardComponent } from './components/bonus-card/bonus-card.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import {AuthorizationService} from './services/authorization.service';
import {AuthGuard} from './services/auth.guard';
import {AuthInterceptor} from './services/auth.interceptor';
import {LoginGuard} from './services/login.guadr';
import {AdminGuard} from './services/admin.guadr';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import {environment} from '../environments/environment';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(`${environment.google_api}`)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(`${environment.facebook_api}`)
  }
]);

export function provideConfig() {
  return config;
}

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'}, /*for redirecting from MainLayout to MainPage*/
      {path: '', component: MainPageComponent},
      {path: 'campaign/:id', component: CampaignPageComponent},
      {path: 'campaign/:id/article/:article_id', component: ArticlePageComponent}
    ]
  },
  {
    path: 'profile', loadChildren: './profile/profile.module#ProfileModule' /*loadChildren for lazy loading*/
  }
];

const  INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

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
    }),
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    AuthorizationService,
    AuthGuard,
    LoginGuard,
    AdminGuard,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

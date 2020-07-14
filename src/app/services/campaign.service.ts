import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

import {AuthService} from 'angularx-social-login';
import {RegistrationRequest, RegistrationResponse, User} from './authorization.service';

export interface Campaign {
  id?: number;
  name?: string;
  category?: Category;
  description?: string;
  targetAmount?: number;
  expirationDate?: Date;
  video?: string;
  tags?: Tag[];
  bonuses?: Bonus;
  article?: Article;
  images?: {id?: number, imageLink?: string}[];
  collectedAmount?: number;
  percent?: number;
  rating?: {value: number};
  user?: {id?: any; username?: string};
  launchDate?: Date;
  modificationDate?: Date;
}
export interface Category {
  id?: number;
  name?: string;
}
export interface CampaignRequest {
  campaign: Campaign;
}
export interface CampaignResponse {
  campaign: Campaign;
}
export interface CampaignsResponse {
  campaigns: Campaign[];
}
export interface CampaignsSortResponse {
  content: Campaign[];
}
export interface CategoryResponse {
  categories: Category[];
}
export interface Tag {
  name?: string;
}
export interface TagsResponse {
  tags: Tag[];
}
export interface Article {
  id?: number;
  creationDate: Date;
  headline: string;
  imageLink: string;
  text: string;
}

export interface Bonus {
  id?: number;
  amount: number;
  description: string;
  name: string;
}
export interface BonusesResponse {
  bonuses: Bonus[];
}
export interface BonusRequest {
  bonus: Bonus;
}
export interface BonusResponse {
  bonus: Bonus;
}

@Injectable({providedIn: 'root'})
export class CampaignService {

  public error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) {}

  public getCategories(): Observable<Category[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}categories`, {headers})
      .pipe(
        map( (response: CategoryResponse) => {
          return response.categories;
        }),
        catchError(errors => {
          this.error$.next(errors.error.error.messages[0]);
          return throwError(errors);
        })
      );
  }

  public getTags(): Observable<string[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}tags`, {headers})
      .pipe(
        map( (response: TagsResponse) => {
          console.log('TAG_RESPONSE', response);
          return response.tags.map(tags => tags.name);
        }),
        catchError(errors => {
          this.error$.next(errors.error.error.messages[0]);
          return throwError(errors);
        })
      );
  }

  public createCampaign(campaign: Campaign, userId: string): Observable<Campaign> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const request: CampaignRequest = {campaign: campaign};
    return this.http.post(`${environment.apiUrl}users/${userId}/campaigns`, JSON.stringify(request), {headers})
      .pipe(
        map((response: CampaignResponse) => {
        return response.campaign;
        }),
        catchError(errors => {
          this.error$.next(errors.error.error.messages[0]);
          return throwError(errors);
        })
      );
  }

  public getCampaignById(campaignId: string): Observable<Campaign> {
    return this.http.get(`${environment.apiUrl}campaigns/${campaignId}`)
      .pipe(
        map((response: CampaignResponse) => {
          console.log('RESPONSE_CAMPAIGN_BY_ID', response.campaign);
          return response.campaign;
        })
      );
  }

  public getAllUsersCampaigns(userId: string): Observable<Campaign[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}users/${userId}/campaigns`, {headers})
      .pipe(
        map((data: CampaignsResponse) => {
          return data.campaigns;
        }),
        catchError(errors => {
          this.error$.next(errors.error.error.messages[0]);
          return throwError(errors);
        })
      );
  }

  public updateCampaign(campaign: Campaign, userId: string): Observable<Campaign> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const request: CampaignRequest = {campaign: campaign};
    return this.http.put(`${environment.apiUrl}users/${userId}/campaigns/${campaign.id}`, JSON.stringify(request), {headers})
      .pipe(
        map((response: CampaignResponse) => {
          return response.campaign;
        }),
        catchError(errors => {
          this.error$.next(errors.error.error.messages[0]);
          return throwError(errors);
        })
      );
  }

  public getAllCampaignsSortingByParams(sortingParams: string): Observable<Campaign[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}campaigns?sortingParam=${sortingParams}`, {headers})
      .pipe(
        map((data: CampaignsSortResponse) => {
          return data.content;
        }),
        catchError(errors => {
          this.error$.next(errors.error.error.messages[0]);
          return throwError(errors);
        })
      );
  }

  public getAllCampaignsBonuses(userId: string, campaignId: string): Observable<Bonus[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}users/${userId}/campaigns/${campaignId}/bonuses`, {headers})
      .pipe(
        map((data: BonusesResponse) => {
          return data.bonuses;
        }),
        catchError(errors => {
          this.error$.next(errors.error.error.messages[0]);
          return throwError(errors);
        })
      );
  }

  public createBonus(bonus: Bonus, userId: string, campaignId: string): Observable<Bonus> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const request: BonusRequest = {bonus: bonus};
    return this.http.post(`${environment.apiUrl}users/${userId}/campaigns/${campaignId}/bonuses`, JSON.stringify(request), {headers})
      .pipe(
        map((response: BonusResponse) => {
          return response.bonus;
        }),
        catchError(errors => {
          this.error$.next(errors.error.error.messages[0]);
          return throwError(errors);
        })
      );
  }

  public removeBonus(userId: string, campaignId: string, bonusId): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}users/${userId}/campaigns/${campaignId}/bonuses/${bonusId}`);
  }

}

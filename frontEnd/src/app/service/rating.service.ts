import { ConfigService } from './config.service';
import { ApiService2 } from './api.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Rating, Review } from '../pages/rating';
@Injectable()
export class RatingService {


  constructor(private http: Http, private apiService: ApiService2, private config: ConfigService) { }

  // Review --------

  getAllReviews(rating: Rating): Observable<Review[]> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = this.apiService.getOptions();

    return this
      .http
      .post(this.config.all_review_url, rating, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  putReview(review: Review): Observable<number> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = this.apiService.getOptions();
    return this
      .http
      .post(this.config.review_url, review, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  // Rating ------------

  getAllRatings(): Observable<Rating[]> {
    const options = this.apiService.getOptions();
    return this
      .http
      .get(this.config.all_rating_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllRatingsByUsername(username: string): Observable<Rating[]> {
    const cpHeaders = this.apiService.getcpHeaders();
    const cpParams = new URLSearchParams();
    cpParams.set('username', username);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this
      .http
      .get(this.config.rating_by_userName_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRatingById(id: string): Observable<Rating> {
    const cpHeaders = this.apiService.getcpHeaders();
    const cpParams = new URLSearchParams();
    cpParams.set('id', id);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this
      .http
      .get(this.config.rating_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRatingByName(name: string): Observable<Rating> {
    const cpHeaders = this.apiService.getcpHeaders();

    const cpParams = new URLSearchParams();
    cpParams.set('name', name);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this
      .http
      .get(this.config.rating_by_name_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  putRating(rating: Rating): Observable<number> {
    const cpHeaders = this.apiService.getcpHeaders();
    const options = new RequestOptions({ headers: cpHeaders });
    return this
      .http
      .post(this.config.rating_url, rating, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  updateStatuseRating(rating: Rating): Observable<number> {
    const cpHeaders = this.apiService.getcpHeaders();
    const options = new RequestOptions({ headers: cpHeaders });
    return this
      .http
      .post(this.config.rating_some_url, rating, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  updateInfoRating(rating: Rating): Observable<number> {
    const cpHeaders = this.apiService.getcpHeaders();
    const options = new RequestOptions({ headers: cpHeaders });
    return this
      .http
      .post(this.config.rating_some_info_url, rating, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  createRating(rating: Rating): Observable<number> {
    const cpHeaders = this.apiService.getcpHeaders();
    const options = new RequestOptions({ headers: cpHeaders });
    return this
      .http
      .post(this.config.creatt_Rating_url, rating, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  // deleteRatingById(id: string): Observable < number > {   let cpHeaders = new
  // Headers({'Content-Type': 'application/json'});   let cpParams = new
  // URLSearchParams();   cpParams.set('id', id);   let options = new
  // RequestOptions({headers: cpHeaders, params: cpParams});   return this
  // .http     .delete(this.rating, options)     .map(success => success.status)
  //   .catch(this.handleError); }

  deleteRatingByRating(rating: Rating): Observable<number> {
    const cpHeaders = this.apiService.getcpHeaders();
    const options = new RequestOptions({ headers: cpHeaders });
    return this
      .http
      .post(this.config.delete_rating_url, rating, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  // login(user) {   const body = `username='admin'&password='123'`;   const
  // headers = new Headers();   headers.append('Content-Type',
  // 'application/x-www-form-urlencoded');   return
  // this.apiService.post(this.login_url, body, headers); } Utils -------------
  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    // console.error(error.message || error);
    return Observable.throw(error.status);
  }

}

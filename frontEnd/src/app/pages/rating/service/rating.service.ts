import { ApiService2 } from './../../../service/api.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Rating, Review } from '../';
@Injectable()
export class RatingService {
  adress = '';
  // adress = 'http://localhost:8080/rating-app' adress = '/rating-app'

  creattRating = this.adress + '/api/create-rating';
  rating = this.adress + '/api/rating';
  deleteRating = this.adress + '/api/delete-rating';

  ratingByName = this.adress + '/api/ratingName';
  allrating = this.adress + '/api/all-rating';

  allReview = this.adress + '/api/all-reviews';

  review = this.adress + '/api/review';

  private _auth_url = '/auth';

  login_url = this._auth_url + '/login';

  logout_url = this._auth_url + '/logout';

  _rating_by_userName = '/api/ratingByUserName';

  constructor(private http: Http, private apiService: ApiService2) { }

  // Review --------

  getAllReviews(rating: Rating): Observable<Review[]> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = this.apiService.getOptions();

    return this
      .http
      .post(this.allReview, rating, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  putReview(review: Review): Observable<number> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = this.apiService.getOptions();
    return this
      .http
      .post(this.review, review, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  // Rating ------------

  getAllRatings(): Observable<Rating[]> {
    const options = this.apiService.getOptions();
    return this
      .http
      .get(this.allrating, options)
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
      .get(this._rating_by_userName, options)
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
      .get(this.rating, options)
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
      .get(this.ratingByName, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  putRating(rating: Rating): Observable<number> {
    const cpHeaders = this.apiService.getcpHeaders();
    const options = new RequestOptions({ headers: cpHeaders });
    return this
      .http
      .post(this.rating, rating, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  createRating(rating: Rating): Observable<number> {
    const cpHeaders = this.apiService.getcpHeaders();
    const options = new RequestOptions({ headers: cpHeaders });
    return this
      .http
      .post(this.creattRating, rating, options)
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
      .post(this.deleteRating, rating, options)
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

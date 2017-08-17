import { User } from './../pages/create-users/model/user';
import { Http, Headers, Response, URLSearchParams, RequestMethod, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService2 {

  tokenName = 'jwtToken';
  headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
  cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.cpHeaders });
  constructor(
    private http: Http
  ) {
  }

  anonGet(path: string): Observable<any> {
    const jtoken = localStorage.getItem(this.tokenName);
    const cpHeaders = new Headers({ 'Content-Type': 'application/json', 'Authorization': jtoken });
    return this.http.get(
      path,
      {
        headers: cpHeaders,
        withCredentials: true
      }
    )
      .map(this.extractData);
  }

  get(path: string): Observable<any> {
    return this.http.get(
      path,
      {
        headers: this.headers,
        withCredentials: true
      }
    )
      .map(this.extractData)
      .catch(this.checkAuth.bind(this));
  }
  // =========
  // getPotected(): Observable<any> {
  //   return this.http.get(
  //     '/protected', this.getOptions()
  //   )
  //     .map(this.extractData)
  //     .catch(this.checkAuth.bind(this));
  // }
  // --------------
  getOptions() {
    const jtoken = localStorage.getItem(this.tokenName);
    const cpHeaders = new Headers({ 'Content-Type': 'application/json', "Authorization": jtoken });
    const options = new RequestOptions({ headers: cpHeaders });
    return options;
  }
  getcpHeaders() {
    const jtoken = localStorage.getItem(this.tokenName);
    const cpHeaders = new Headers({ 'Content-Type': 'application/json', "Authorization": jtoken });
    return cpHeaders;
  }
  // =====================
  getUser(path: string): Observable<any> {
    const options = this.getOptions();

    return this.http.get(path, options)
      .map(this.extractData)
      .catch(this.checkAuth.bind(this));
  }

  getAllUsers(url): Observable<User[]> {
    const options = this.getOptions();
    return this.http
      .get(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  post(path: string, body, customHeaders?, put?): Observable<any> {
    return this.http.request(
      path,
      {
        method: put ? RequestMethod.Put : RequestMethod.Post,
        body: body,
        headers: customHeaders || this.headers,
        withCredentials: true
      }
    )
      .map(this.extractData)
      .catch(this.checkAuth.bind(this));
  }


  createUser(path, user) {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = this.getOptions();
    return this
      .http
      .post(path, user, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  put(path: string, body: any): Observable<any> {
    const options = this.getOptions();
    return this.post(path, body, options);
  }

  updateUser(path:string, user) {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = this.getOptions();
    return this
      .http
      .post(path, user, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  getUserRating(path: string, userName: string): Observable<any> {
    const cpHeaders = this.getcpHeaders();
    const cpParams = new URLSearchParams();
    cpParams.set('userName', userName);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });

    return this.http.get(path, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  putUserRating(path: string, userRating) {
    const cpHeaders = this.getcpHeaders();
    const options = new RequestOptions({ headers: cpHeaders });
    return this
      .http
      .post(path, userRating, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteUser_(path: string, body) {
    const cpHeaders = this.getcpHeaders();
    const options = new RequestOptions({ headers: cpHeaders, body: body });
    return this.http.delete(path, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  // Display error if logged in, otherwise redirect to IDP
  private checkAuth(error: any) {
    if (error && error.status === 401) {
      // this.redirectIfUnauth(error);
    } else {
      // this.displayError(error);
    }
    throw error;
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}

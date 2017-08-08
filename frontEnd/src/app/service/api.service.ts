import { User } from './../pages/create-users/model/user';
import { Http, Headers, Response, RequestMethod, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService2 {

  csrfToken: string;
  headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
  cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.cpHeaders });
  constructor(
    private http: Http
  ) {
  }

  anonGet(path: string): Observable<any> {
    const jtoken = localStorage.getItem("jwtToken")
    const cpHeaders = new Headers({ 'Content-Type': 'application/json', "Authorization": jtoken });
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
  getPotected(): Observable<any> {
    console.log("get protected")

    return this.http.get(
      '/protected', this.getOptions()
    )
      .map(this.extractData)
      .catch(this.checkAuth.bind(this));
  }
  // --------------
  getOptions() {
    const jtoken = localStorage.getItem("jwtToken")
    const cpHeaders = new Headers({ 'Content-Type': 'application/json', "Authorization": jtoken });
    const options = new RequestOptions({ headers: cpHeaders });
    return options;
  }
    getcpHeaders() {
    const jtoken = localStorage.getItem("jwtToken")
    const cpHeaders = new Headers({ 'Content-Type': 'application/json', "Authorization": jtoken });
    return cpHeaders;
  }
  // =====================
  getUser(path: string): Observable<any> {
    const options = this.getOptions();

    return this.http.get('/user', options)
      .map(this.extractData)
      .catch(this.checkAuth.bind(this));
  }

  getAllUsers(url): Observable<User[]> {
    const options = this.getOptions();
    return this.http
      .get(url,options)
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


  createUser(user) {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = this.getOptions();
    return this
      .http
      .post('/registration', user, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  put(path: string, body: any): Observable<any> {
    return this.post(path, body, true);
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

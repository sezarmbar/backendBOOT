import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ApiService2 } from './api.service';
import { ConfigService } from './config.service';

@Injectable()
export class UserService {

  currentUser;

  constructor(
    private apiService: ApiService2,
    private config: ConfigService
  ) { }

  initUser() {
    const promise = this.apiService.anonGet(this.config.refresh_token_url).toPromise()
      .then(res => {
        if (res.access_token !== null) {
          return this.getMyInfo().toPromise()
            .then(user => {
              this.currentUser = user;
            });
        }
      })
      .catch(() => null);
    return promise;
  }

  getMyInfo() {

    return this.apiService.getUser(this.config.whoami_url).map(user => this.currentUser = user);
  }

  getAll() {
    return this.apiService.get(this.config.users_url);
  }
  getAllUsers() {
    console.log('"get ALL : "');
    this.apiService.getAllUsers(this.config.users_url).subscribe((data) => {
      return data;
    }, (error) => console.log(error));
  }
  
  // createUser(use) : Observable < number > {
  //   let cpHeaders = new Headers({'Content-Type': 'application/json'});
  //   let options = new RequestOptions({headers: cpHeaders});
  //   return this
  //     .http
  //     .post(this.config.user_url, user, options)
  //     .map(success => success.status)
  //     .catch(this.handleError);
  // }
}

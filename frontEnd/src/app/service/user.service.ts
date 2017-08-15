import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ApiService2 } from './api.service';
import { ConfigService } from './config.service';

@Injectable()
export class UserService {

  currentUser;
  tokenName = 'jwtToken';

  constructor(private apiService: ApiService2, private config: ConfigService,
    // private loginGuard : LoginGuard,
    //  private createUserPage : CreateUserPage,
    // private adminPage : AdminPage
  ) { }

  initUser() {
    const token = localStorage.getItem(this.tokenName)
    if (token != null) {
      const promise = this
        .apiService
        .anonGet(this.config.refresh_token_url)
        .toPromise()
        .then(res => {
          if (res.access_token !== null) {
            return this
              .getMyInfo()
              .toPromise()
              .then(user => {
                this.currentUser = user;
              });
          }
        })
        .catch(() => null);
      return promise;
    }
  }

  getMyInfo() {

    return this
      .apiService
      .getUser(this.config.whoami_url)
      .map(user => this.currentUser = user);
  }

  getAll() {
    return this
      .apiService
      .get(this.config.users_url);
  }
  getAllUsers() {
    this
      .apiService
      .getAllUsers(this.config.users_url)
      .subscribe((data) => {
        return data;
      }, (error) => console.log(error));
  }

  getUserRating(userName: string) {
    this.apiService.getUserRating(this.config.user_rating_url, userName)
      .subscribe((data) => {
        return data;
      }, (error) => console.log(error));
  }
}

import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ApiService2 } from './api.service';
import { ConfigService } from './config.service';

@Injectable()
export class AuthService {

  constructor(
    private apiService: ApiService2,
    private config: ConfigService
  ) { }

  login(user) {
    const body = `username=${user.username}&password=${user.password}`;
    const bod = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.apiService.post(this.config.login_url, bod, headers);
  }

  logout() {
    localStorage.removeItem('jwtToken');
    // return this.apiService.post(this.config.logout_url, {});
  }

}

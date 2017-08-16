import { UserService } from './service/user.service';
import { LoginGuard, AdminPage, CreateUserPage } from './guard';
import * as jwtDecode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';


@Component({ selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.scss'] })
export class AppComponent implements OnInit {
  TOKEN_KEY = 'jwtToken';

  constructor(private loginGuard: LoginGuard,
    private createUserPage: CreateUserPage, private adminPage: AdminPage,
    private userService: UserService) { }

  ngOnInit() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token != null) {
      this.setUserRollesUI(token);
     }
  }

  setUserRollesUI(token) {
    if (this.getRoles(token)) {
      this.loginGuard.active = false;
      this.createUserPage.active = true;
      this.adminPage.isUser = false;
      this.adminPage.active = true;
    } else {
      this.loginGuard.active = false;
      this.adminPage.active = true;
      this.adminPage.isUser = true;
      this.createUserPage.active = false;
    }
  }
  getRoles(token): boolean {
    let isAdmin = false;
    const decodedTokenPayloadOld = jwtDecode<TokenDto>(token);
    const roles = decodedTokenPayloadOld.roles;
    this.createUserPage.username = decodedTokenPayloadOld.sub;
    const role = roles.find((role: any) => { return role.authority === 'ROLE_ADMIN'; });
    if (role !== undefined) {
      isAdmin = true;
    }
    return isAdmin;
  }
}

interface TokenDto {
  sub: string;
  exp: number;
  iat: number;
  roles: Array<Authority>;
}
interface Authority {
  authority: string;
}

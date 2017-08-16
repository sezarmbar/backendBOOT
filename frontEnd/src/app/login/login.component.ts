import { LoginGuard, AdminPage, CreateUserPage } from './../guard';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwtDecode from "jwt-decode";

import {
  UserService,
  AuthService
} from '../service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Login';

  form: FormGroup;
  TOKEN_KEY = "jwtToken"
  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted = false;

  /**
   * Diagnostic message from received
   * form request error
   */
  errorDiagnostic: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginGuard: LoginGuard,
    private createUserPage: CreateUserPage,
    private adminPage: AdminPage
  ) {

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });

  }

  onSubmit() {
    /**
     * Innocent until proven guilty
     */
    this.submitted = true;
    this.errorDiagnostic = null;

    this.authService.login(this.form.value)
      // show me the animation
      .delay(1000)
      .subscribe(data => {
        this.router.navigate(['/home']);
        localStorage.setItem(this.TOKEN_KEY, data.token);
        this.setUserRollesUI(data.token);
        this.userService.getMyInfo().subscribe((res) => this.createUserPage.username = res.username);
      },
      error => {
        this.submitted = false;
        this.errorDiagnostic = 'Incorrect username or password.';
      });

  }
  setUserRollesUI(token) {
    if (token != null) {
      if (this.getRoles(token)) {
        this.createUserPage.active = true;
        this.adminPage.isUser = false;
        this.adminPage.active = true;
        this.loginGuard.active = false;
      } else {
        this.adminPage.active = true;
        this.adminPage.isUser = true;
        this.createUserPage.active = false;
        this.loginGuard.active = false;
      }
    }
  }
  getRoles(token): boolean {
    let isAdmin = false;
    const decodedTokenPayloadOld = jwtDecode<TokenDto>(token);
    const roles = decodedTokenPayloadOld.roles;

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

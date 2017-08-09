import { LoginGuard } from './../guard';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private loginGuard: LoginGuard
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
        localStorage.setItem(this.TOKEN_KEY, data.token);
        this.userService.getMyInfo().subscribe(res => this.userService.currentUser = res); 
        this.loginGuard.active = false;
        this.router.navigate(['/admin']);
      },
      error => {
        this.submitted = false;
        this.errorDiagnostic = 'Incorrect username or password.';
      });

  }


}
// {"timestamp":1502215694803,"status":500,"error":"Internal Server Error","exception":"org.springframework.security.core.userdetails.UsernameNotFoundException","message":"No user found with username 'sezarmbar'.","path":"/registration"}
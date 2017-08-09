import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { UserService } from '../service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {
  active= true;
  constructor(private router: Router, private userService: UserService) { }
  canActivate(): boolean {
    
    if (this.userService.currentUser) {
      
      this.router.navigate(['/']);
      this.active = false;
      return this.active;
    } else {   
      this.active = true;
      return this.active;
    }
  }
}


@Injectable()
export class AdminPage implements CanActivate {
  active= false;
  isUser =false;
  constructor(private router: Router, private loginGuard: LoginGuard, private userService: UserService) { }

  canActivate(): boolean {
      return this.active;
  }

}

@Injectable()
export class CreateUserPage implements CanActivate {
active= false;
  constructor(private router: Router, private loginGuard: LoginGuard) { }

  canActivate(): boolean {
      return this.active;
  }

}
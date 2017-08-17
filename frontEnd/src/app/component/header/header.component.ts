import { Component, OnInit,HostListener } from '@angular/core';
import {
  UserService,
  AuthService
} from '../../service';

import { Router } from '@angular/router';
import { CreateUserPage } from '../../guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    console.log(event.key)
    if(['ß'].includes(event.key)){
      this.show=!this.show;
    }
    if(['Dead'].includes(event.key)){
      this.router.navigate(['/creatUsers']);
    }
    if(['®'].includes(event.key)){
      this.router.navigate(['/createRating']);
    }
    
  }
  

  show = true;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private createUserPage: CreateUserPage
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
    this.userService.currentUser = null;
    this.router.navigate(['/login']);
    // .subscribe(res => {
    //   this.userService.currentUser = null;
    //   this.router.navigate(['/login']);
    // });
  }

  hasSignedIn() {
    return !!this.userService.currentUser;
  }

  isSuperUser() {
    return this.createUserPage.active;
  }
  userName() {
    const user = this.userService.currentUser;
    return user.username;
  }

}

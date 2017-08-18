import { Component, OnInit, HostListener } from '@angular/core';
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
  show = true;
  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    if (['ß', 'Í'].includes(event.key)) {
      this.show = !this.show;
    }
    if (['Dead', '¨'].includes(event.key)) {
      this.router.navigate(['/creatUsers']);
    }
    if (['®'].includes(event.key)) {
      this.router.navigate(['/createRating']);
    }
    if (['å', 'Å'].includes(event.key)) {
      this.router.navigate(['/admin']);
    }
    if (['˙', 'Ó'].includes(event.key)) {
      this.router.navigate(['/helpe']);
    }

  }
  @HostListener('window:keydown.alt.s', ['$event'])
  keydownAlts(event: KeyboardEvent) {
    this.show = !this.show;
  }
  @HostListener('window:keydown.alt.u', ['$event'])
  keydownAltu(event: KeyboardEvent) {
    this.router.navigate(['/creatUsers']);
  }
  @HostListener('window:keydown.alt.r', ['$event'])
  keydownAltr(event: KeyboardEvent) {
   this.router.navigate(['/createRating']);
  }
  @HostListener('window:keydown.alt.a', ['$event'])
  keydownAlta(event: KeyboardEvent) {
    this.router.navigate(['/admin']);
  }
  @HostListener('window:keydown.alt.h', ['$event'])
  keydownAlth(event: KeyboardEvent) {
    this.router.navigate(['/helpe']);
  }


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
